export function HeroArt() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -inset-5 z-0 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)]"
      viewBox="0 0 360 360"
      fill="none"
      focusable="false"
      preserveAspectRatio="none"
    >
      <rect className="hero-art-float" x="202" y="12" width="145" height="112" fill="#E11D27" />
      <rect x="12" y="234" width="112" height="112" stroke="#0B0B0B" strokeWidth="2" />
      <g fill="#0B0B0B">
        <circle cx="223" cy="176" r="2" />
        <circle cx="239" cy="176" r="2" />
        <circle cx="255" cy="176" r="2" />
        <circle cx="271" cy="176" r="2" />
        <circle cx="287" cy="176" r="2" />
        <circle cx="223" cy="192" r="2" />
        <circle cx="239" cy="192" r="2" />
        <circle cx="255" cy="192" r="2" />
        <circle cx="271" cy="192" r="2" />
        <circle cx="287" cy="192" r="2" />
        <circle cx="223" cy="208" r="2" />
        <circle cx="239" cy="208" r="2" />
        <circle cx="255" cy="208" r="2" />
        <circle cx="271" cy="208" r="2" />
        <circle cx="287" cy="208" r="2" />
      </g>
    </svg>
  );
}
