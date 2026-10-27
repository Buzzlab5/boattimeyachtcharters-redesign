'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type {
  KaiChatTurn,
  KaiContactRequest,
  KaiExtraOption,
  KaiPaymentRequest,
  KaiProductCard,
  KaiTicketOption,
  KaiTimeOption,
} from '@/lib/kai';
import KaiProductCardView from './KaiProductCard';
import KaiContactForm from './KaiContactForm';
import KaiDateCalendar from './KaiDateCalendar';
import KaiTimeOptions from './KaiTimeOptions';
import KaiPricedOptions from './KaiPricedOptions';

type ChatMessage = {
  id: string;
  role: 'traveller' | 'assistant';
  content: string;
  cards?: KaiProductCard[];
  contactRequest?: KaiContactRequest | null;
  paymentRequest?: KaiPaymentRequest | null;
  /** Set once the traveller has sent their details, so the form isn't offered twice. */
  contactAnswered?: boolean;
  dateOptions?: string[] | null;
  /** Set once a date has been picked from this message's calendar, so it isn't offered twice. */
  dateAnswered?: boolean;
  timeOptions?: KaiTimeOption[] | null;
  ticketOptions?: KaiTicketOption[] | null;
  extraOptions?: KaiExtraOption[] | null;
  /** Set once one of timeOptions/ticketOptions/extraOptions has been picked, so those buttons
   * aren't offered again once the conversation has moved past that choice. */
  choiceAnswered?: boolean;
};

let messageCounter = 0;
const nextId = () => `m${++messageCounter}`;

/**
 * Persists the conversation across a page navigation, not just component re-renders - KaiWidget
 * lives in the root layout, so client-side <Link> navigation alone doesn't unmount it, but this
 * site also has plain-anchor and full-reload navigations (reported live: switching pages reset the
 * chat to 0 messages). sessionStorage rather than localStorage: scoped to one tab/visit, cleared
 * once the tab closes, which matches "same visit, different page" without following the traveller
 * around forever.
 */
const STORAGE_KEY = 'kai_conversation_v1';

type StoredConversation = { conversationId: string; messages: ChatMessage[] };

function loadStoredConversation(): StoredConversation | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.conversationId !== 'string' || !Array.isArray(parsed?.messages)) return null;
    return parsed as StoredConversation;
  } catch {
    // Private browsing / storage disabled / corrupt JSON - just start a fresh conversation.
    return null;
  }
}

function saveStoredConversation(conversationId: string, messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ conversationId, messages }));
  } catch {
    // Quota exceeded or storage disabled - the conversation just won't survive a reload.
  }
}

function clearStoredConversation() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clean up if storage was never writable in the first place.
  }
}

/** messageCounter resets to 0 on every page load; restored ids (from a previous load) can already
 * be past that. Without this, the first id nextId() mints post-restore can collide with a restored
 * message's id and break React's key uniqueness. */
function bumpMessageCounterPast(messages: ChatMessage[]) {
  for (const message of messages) {
    const n = Number(message.id.slice(1));
    if (Number.isFinite(n) && n > messageCounter) messageCounter = n;
  }
}

/**
 * Kai sends payment links as plain text inside its reply. Render them as real links so nobody has
 * to select and copy a URL by hand. The trailing character class keeps sentence punctuation out of
 * the href. New tab, because this chat only lives in memory — navigating away would lose it.
 */
const URL_PATTERN = /(https?:\/\/[^\s]*[^\s.,;:!?)\]])/g;

/** Checkout URLs run to 300+ characters; showing them raw buries the message. */
function linkLabel(url: string) {
  if (url.length <= 48) return url;
  try {
    return `${new URL(url).hostname}/…`;
  } catch {
    return `${url.slice(0, 45)}…`;
  }
}

function withLinks(text: string) {
  return text.split(URL_PATTERN).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} className="kai-link" href={part} target="_blank" rel="noopener noreferrer">
        {linkLabel(part)}
      </a>
    ) : (
      part
    ),
  );
}

// Pages where the Kai chat is switched off for now. To bring it back on one of
// them, delete its path from this list. To hide it everywhere, add '*'.
const HIDE_KAI_ON = ['*'];

export default function KaiWidget() {
  const pathname = usePathname();
  if (HIDE_KAI_ON.includes('*') || HIDE_KAI_ON.includes(pathname)) return null;
  return <KaiWidgetInner />;
}

function KaiWidgetInner() {
  const [open, setOpen] = useState(false);
  const [starting, setStarting] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [retryText, setRetryText] = useState('');
  const [lift, setLift] = useState(0);

  const streamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Guards against starting two conversations at once. This has to be a ref, not state: state
   * changes re-run the effect, whose cleanup would then cancel the very request it just started.
   */
  const startedRef = useRef(false);

  const startConversation = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Resume rather than start fresh if this tab already has a conversation from an earlier page
    // on this same visit - the whole point is that a page navigation shouldn't reset the chat.
    const stored = loadStoredConversation();
    if (stored) {
      bumpMessageCounterPast(stored.messages);
      setConversationId(stored.conversationId);
      setMessages(stored.messages);
      return;
    }

    setStarting(true);
    setError('');

    try {
      const [sessionRes, configRes] = await Promise.all([
        fetch('/api/kai/session', { method: 'POST' }),
        fetch('/api/kai/config'),
      ]);

      if (!sessionRes.ok) throw new Error('session failed');

      const session = await sessionRes.json();
      const config = configRes.ok ? await configRes.json() : null;

      setConversationId(session.conversationId);
      setMessages([
        {
          id: nextId(),
          role: 'assistant',
          content: config?.welcomeMessage ?? 'Hi, I am Kai. How can I help with your charter?',
        },
      ]);
    } catch {
      setError("Kai isn't responding right now — please try again.");
      startedRef.current = false; // let the retry button try again
    } finally {
      setStarting(false);
    }
  }, []);

  /* Start a conversation the first time the panel opens. */
  useEffect(() => {
    if (open) startConversation();
  }, [open, startConversation]);

  /* Mirrors every turn into sessionStorage so the next page on this visit can resume it. */
  useEffect(() => {
    if (conversationId) saveStoredConversation(conversationId, messages);
  }, [conversationId, messages]);

  /**
   * Lift the widget clear of the sticky ticker bar. TickerBar (components/TickerBar.tsx) slides in
   * past 300px of scroll; without this the launcher lands on top of its Tickets button.
   *
   * Its height is measured rather than hard-coded: on desktop the bar is a 52px single row, but on
   * mobile it is `height: auto` and reflows into two rows, so any fixed number is wrong on one of
   * them. A ResizeObserver catches rotation and reflow too.
   */
  const tickerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (!tickerRef.current?.isConnected) {
        tickerRef.current = document.querySelector<HTMLElement>('.ticker-bar-wrap');
      }
      const bar = tickerRef.current;
      setLift(window.scrollY > 300 && bar ? bar.offsetHeight : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const observer = new ResizeObserver(update);
    if (tickerRef.current) observer.observe(tickerRef.current);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, []);

  // Consumed by .kai-launcher / .kai-panel as calc(<base offset> + var(--kai-lift)).
  const liftStyle = { '--kai-lift': `${lift}px` } as React.CSSProperties;

  /**
   * Keep the newest message in view. Deliberately instant, not smooth: a tall block (product
   * cards, the contact form) arriving mid-animation left its buttons below the fold and
   * unclickable until the animation finished.
   */
  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;
    // Second pass on the next frame, once the new block has been laid out and measured.
    stream.scrollTop = stream.scrollHeight;
    const frame = requestAnimationFrame(() => {
      stream.scrollTop = stream.scrollHeight;
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, pending]);

  useEffect(() => {
    if (open && !pending && conversationId) inputRef.current?.focus();
  }, [open, pending, conversationId]);

  async function send(content: string) {
    const text = content.trim();
    if (!text || !conversationId || pending) return;

    setMessages((prev) => [...prev, { id: nextId(), role: 'traveller', content: text }]);
    setDraft('');
    setError('');
    setRetryText('');
    setPending(true);

    try {
      const res = await fetch('/api/kai/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, content: text }),
      });

      if (!res.ok) throw new Error('message failed');

      const turn: KaiChatTurn = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          content: turn.reply,
          cards: turn.productCards,
          contactRequest: turn.contactRequest,
          paymentRequest: turn.paymentRequest,
          dateOptions: turn.dateOptions,
          timeOptions: turn.timeOptions,
          ticketOptions: turn.ticketOptions,
          extraOptions: turn.extraOptions,
        },
      ]);
    } catch {
      setError("Kai isn't responding right now — please try again.");
      setRetryText(text);
    } finally {
      setPending(false);
    }
  }

  function resetConversation() {
    startedRef.current = false;
    clearStoredConversation();
    setConversationId(null);
    setMessages([]);
    setDraft('');
    setError('');
    setRetryText('');
    startConversation();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(draft);
    }
  }

  const busy = pending || starting;

  return (
    <>
      <button
        className={`kai-launcher${open ? ' kai-launcher--hidden' : ''}`}
        style={liftStyle}
        onClick={() => setOpen(true)}
        aria-label="Open the booking assistant"
      >
        <span className="kai-launcher-dot" aria-hidden="true" />
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
          <path
            d="M3 5.5h18v11H8.5L4 20.5v-4H3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span>Ask Kai</span>
      </button>

      <div
        className={`kai-panel${open ? ' kai-panel--open' : ''}`}
        style={liftStyle}
        role="dialog"
        aria-label="Booking assistant"
      >
        <header className="kai-header">
          <div>
            <p className="kai-eyebrow">Booking Assistant</p>
            <h2 className="kai-title">Kai</h2>
          </div>
          <div className="kai-header-actions">
            <button className="kai-icon-btn" onClick={resetConversation} aria-label="Start a new conversation">
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path
                  d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="kai-icon-btn" onClick={() => setOpen(false)} aria-label="Close the booking assistant">
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <div className="kai-stream" ref={streamRef}>
          {starting && <p className="kai-status">Starting a conversation…</p>}

          {messages.map((message) => (
            <div key={message.id} className={`kai-msg kai-msg--${message.role}`}>
              <div className="kai-bubble">{withLinks(message.content)}</div>

              {message.cards && message.cards.length > 0 && (
                <div className="kai-cards">
                  {message.cards.map((card) => (
                    <KaiProductCardView
                      key={card.slug}
                      card={card}
                      disabled={busy}
                      onSelect={(title) => send(`I'd like the ${title}`)}
                    />
                  ))}
                </div>
              )}

              {message.dateOptions && message.dateOptions.length > 0 && !message.dateAnswered && (
                <KaiDateCalendar
                  dates={message.dateOptions}
                  disabled={busy}
                  onSelect={(date) => {
                    setMessages((prev) =>
                      prev.map((m) => (m.id === message.id ? { ...m, dateAnswered: true } : m)),
                    );
                    send(date);
                  }}
                />
              )}

              {message.timeOptions && message.timeOptions.length > 0 && !message.choiceAnswered && (
                <KaiTimeOptions
                  options={message.timeOptions}
                  disabled={busy}
                  onSelect={(label) => {
                    setMessages((prev) =>
                      prev.map((m) => (m.id === message.id ? { ...m, choiceAnswered: true } : m)),
                    );
                    send(label);
                  }}
                />
              )}

              {message.ticketOptions && message.ticketOptions.length > 0 && !message.choiceAnswered && (
                <KaiPricedOptions
                  options={message.ticketOptions}
                  disabled={busy}
                  onSelect={(text) => {
                    setMessages((prev) =>
                      prev.map((m) => (m.id === message.id ? { ...m, choiceAnswered: true } : m)),
                    );
                    send(text);
                  }}
                />
              )}

              {message.extraOptions && message.extraOptions.length > 0 && !message.choiceAnswered && (
                <KaiPricedOptions
                  options={message.extraOptions}
                  disabled={busy}
                  offerNone
                  onSelect={(text) => {
                    setMessages((prev) =>
                      prev.map((m) => (m.id === message.id ? { ...m, choiceAnswered: true } : m)),
                    );
                    send(text);
                  }}
                />
              )}

              {message.paymentRequest && (
                <div className="kai-payment">
                  <p className="kai-payment-label">Booking summary</p>
                  {message.paymentRequest.productTitle && (
                    <p className="kai-payment-row">{message.paymentRequest.productTitle}</p>
                  )}
                  {message.paymentRequest.dateText && (
                    <p className="kai-payment-row">{message.paymentRequest.dateText}</p>
                  )}
                  {message.paymentRequest.guests != null && (
                    <p className="kai-payment-row">{message.paymentRequest.guests} guests</p>
                  )}
                  {message.paymentRequest.checkoutUrl ? (
                    <a
                      className="kai-pay-btn"
                      href={message.paymentRequest.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Complete secure payment
                    </a>
                  ) : (
                    <p className="kai-payment-note">We&rsquo;ll be in touch to complete payment.</p>
                  )}
                </div>
              )}

              {message.contactRequest && !message.contactAnswered && (
                <KaiContactForm
                  disabled={busy}
                  onSubmit={(text) => {
                    setMessages((prev) =>
                      prev.map((m) => (m.id === message.id ? { ...m, contactAnswered: true } : m)),
                    );
                    send(text);
                  }}
                />
              )}
            </div>
          ))}

          {pending && (
            <div className="kai-msg kai-msg--assistant">
              <div className="kai-bubble kai-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {error && (
            <div className="kai-error">
              <p>{error}</p>
              <button
                onClick={() => {
                  if (!conversationId) {
                    // The conversation never started — try opening one again.
                    setError('');
                    startConversation();
                  } else if (retryText) {
                    setMessages((prev) =>
                      prev.filter((m) => m.content !== retryText || m.role !== 'traveller'),
                    );
                    send(retryText);
                  } else {
                    setError('');
                  }
                }}
              >
                Try again
              </button>
            </div>
          )}
        </div>

        <div className="kai-composer">
          <textarea
            ref={inputRef}
            className="kai-textarea"
            rows={1}
            placeholder="Ask about a cruise, a date, or group size…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={busy || !conversationId}
          />
          <button
            className="kai-send"
            onClick={() => send(draft)}
            disabled={busy || !conversationId || !draft.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
