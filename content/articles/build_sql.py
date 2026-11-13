#!/usr/bin/env python3
"""Turn the .md drafts in this folder into SQL whose `content` is HTML.

Why this exists. components/ArticlePage.tsx injects posts.content straight into
the page as HTML, and extractFAQ() in app/boattime-news/[slug]/page.tsx reads
<h2>/<h3> followed by <p>. The first four drafts were inserted as Markdown, so
they went live as one unbroken paragraph with literal "##" in it and no FAQ
schema. This script is the one place Markdown becomes HTML, so that cannot
happen again.

Usage:
  python3 build_sql.py insert <slug>      -> writes <slug>.sql (published = false)
  python3 build_sql.py fix <slug> [...]   -> prints UPDATE statements to stdout

It handles what the drafts use and nothing else: ## and ### headings,
paragraphs, "- " and "1. " lists, **bold** and [text](url) links. Anything else
is a hard error rather than a guess.
"""
import html
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
FIELDS = ['slug', 'title', 'meta_title', 'meta_description', 'focus_keyword', 'excerpt',
          'author', 'reading_time', 'published', 'image_url', 'image_alt', 'canonical_url']
ARRAYS = ['categories', 'tags', 'schema_types']


def read(slug):
    text = open(os.path.join(HERE, slug + '.md'), encoding='utf-8').read()
    _, front, body = text.split('---\n', 2)
    meta = {}
    for line in front.strip().splitlines():
        key, value = line.split(':', 1)
        value = value.strip()
        if value.startswith('['):
            meta[key] = re.findall(r'"([^"]*)"', value)
        else:
            meta[key] = value[1:-1] if value[:1] == '"' and value[-1:] == '"' else value
    return meta, body.strip()


def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', r'<a href="\2">\1</a>', text)
    if '**' in text or re.search(r'\]\(', text):
        raise SystemExit('unconverted inline markdown: ' + text[:80])
    return text


def to_html(body):
    out = []
    for block in re.split(r'\n\s*\n', body):
        lines = block.strip('\n').splitlines()
        first = lines[0]
        if first.startswith('### '):
            out.append('<h3>%s</h3>' % inline(' '.join(lines)[4:]))
        elif first.startswith('## '):
            out.append('<h2>%s</h2>' % inline(' '.join(lines)[3:]))
        elif first.startswith('#') or first.startswith('>') or first.startswith('|'):
            raise SystemExit('unsupported block: ' + first[:80])
        elif re.match(r'(- |\d+\. )', first):
            tag = 'ul' if first.startswith('- ') else 'ol'
            items = []
            for line in lines:
                m = re.match(r'(- |\d+\. )(.*)', line)
                if m:
                    items.append(m.group(2).strip())
                else:
                    items[-1] += ' ' + line.strip()
            out.append('<%s>%s</%s>' % (
                tag, ''.join('<li><p>%s</p></li>' % inline(i) for i in items), tag))
        else:
            out.append('<p>%s</p>' % inline(' '.join(l.strip() for l in lines)))
    return ''.join(out)


def q(value):
    return "'" + str(value).replace("'", "''") + "'"


def array(values):
    return 'ARRAY[%s]::text[]' % ', '.join(q(v) for v in values)


def insert(slug):
    meta, body = read(slug)
    values = []
    for f in FIELDS:
        values.append(meta[f] if f in ('reading_time', 'published') else q(meta[f]))
    values.append(q(to_html(body)))
    values += [array(meta[a]) for a in ARRAYS]
    cols = FIELDS + ['content'] + ARRAYS
    sql = (
        '-- Draft article for the Boattime posts table.\n'
        '-- Generated from %s.md by build_sql.py. content is HTML, which is what\n'
        '-- the article page renders. published = false: nothing goes live until\n'
        '-- someone ticks Published in /admin.\n'
        '-- Safe to run twice: on conflict (slug) do nothing.\n\n'
        'insert into posts (\n  %s\n) values (\n  %s\n)\non conflict (slug) do nothing;\n'
    ) % (slug, ',\n  '.join(cols), ',\n  '.join(values))
    open(os.path.join(HERE, slug + '.sql'), 'w', encoding='utf-8').write(sql)


def fix(slugs):
    for slug in slugs:
        _, body = read(slug)
        print('update posts set content = %s, updated_at = now()\nwhere slug = %s;\n'
              % (q(to_html(body)), q(slug)))


if __name__ == '__main__':
    if len(sys.argv) >= 3 and sys.argv[1] == 'insert':
        insert(sys.argv[2])
    elif len(sys.argv) >= 3 and sys.argv[1] == 'fix':
        fix(sys.argv[2:])
    else:
        raise SystemExit(__doc__)
