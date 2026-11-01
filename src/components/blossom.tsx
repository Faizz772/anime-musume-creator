type BlossomProps = {
  className?: string;
  petalClassName?: string;
};

const angles = [0, 72, 144, 216, 288];

const petal =
  "M50 50 C47 41 40 33 40 22 C40 15 45 10 48 8 L50 11 L52 8 C55 10 60 15 60 22 C60 33 53 41 50 50 Z";

export function Blossom({ className, petalClassName }: BlossomProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g className={petalClassName} fill="currentColor">
        {angles.map((angle) => (
          <path key={angle} d={petal} transform={`rotate(${angle} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="5.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
