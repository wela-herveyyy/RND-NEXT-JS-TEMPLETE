export function FuturisticBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="futuristic-glow absolute inset-0" />
      <div className="futuristic-dots absolute inset-0" />

      <svg
        className="absolute inset-0 h-full w-full text-primary"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.22" stroke="currentColor" strokeWidth="1">
          <path d="M120 180 L320 180 L320 380" />
          <path d="M1320 120 L1120 120 L1120 280 L920 280" />
          <path d="M80 620 L280 620 L280 420 L480 420" />
          <path d="M1360 720 L1160 720 L1160 520" />
          <line x1="320" y1="180" x2="520" y2="80" />
          <line x1="1120" y1="280" x2="960" y2="400" />
          <line x1="480" y1="420" x2="640" y2="320" />
          <line x1="720" y1="160" x2="720" y2="740" strokeDasharray="4 8" opacity="0.6" />
          <line x1="200" y1="450" x2="1240" y2="450" strokeDasharray="2 10" opacity="0.45" />
        </g>

        <g fill="currentColor">
          {[
            [120, 180],
            [320, 180],
            [320, 380],
            [1320, 120],
            [1120, 120],
            [1120, 280],
            [920, 280],
            [80, 620],
            [280, 620],
            [280, 420],
            [480, 420],
            [1360, 720],
            [1160, 720],
            [1160, 520],
            [520, 80],
            [960, 400],
            [640, 320],
            [720, 160],
            [720, 740],
            [200, 450],
            [1240, 450],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" opacity="0.55" />
          ))}
          <circle cx="720" cy="450" r="5" opacity="0.75" className="futuristic-pulse" />
        </g>

        <g opacity="0.14" stroke="currentColor" strokeWidth="1">
          <rect x="560" y="120" width="320" height="200" rx="24" />
          <rect x="160" y="560" width="240" height="160" rx="20" />
          <rect x="1040" y="520" width="200" height="200" rx="20" />
        </g>
      </svg>

      <div className="futuristic-scan absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}
