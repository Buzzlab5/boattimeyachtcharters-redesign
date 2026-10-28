/** Line icons for the gallery buttons (arrows, close). They take their colour from the button's text colour. */

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export const ChevronLeftIcon = ({ size }: { size?: number }) => <Icon d="M14.5 5.5L8 12l6.5 6.5" size={size} />;
export const ChevronRightIcon = ({ size }: { size?: number }) => <Icon d="M9.5 5.5L16 12l-6.5 6.5" size={size} />;
export const CloseIcon = ({ size }: { size?: number }) => <Icon d="M6 6l12 12M18 6L6 18" size={size} />;
