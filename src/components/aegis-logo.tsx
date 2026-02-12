import { cn } from "@/lib/utils";

interface AegisLogoProps {
  size?: number;
  className?: string;
}

export function AegisLogo({ size = 40, className }: AegisLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
    >
      {/* Shield outline — concave top, notched crown bottom, pointed base */}
      <path
        d="
          M 100 232
          L 62 192
          L 52 192
          L 52 178
          L 16 136
          L 16 44
          Q 16 16 44 16
          L 80 16
          L 100 34
          L 120 16
          L 156 16
          Q 184 16 184 44
          L 184 136
          L 148 178
          L 148 192
          L 138 192
          L 100 232
          Z
        "
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Diamond / eye at the apex */}
      <path
        d="M 100 52 L 118 80 L 100 108 L 82 80 Z"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Left leg of the A — lower-left up to diamond */}
      <path
        d="M 44 176 L 100 68"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Right leg of the A — lower-right up to diamond */}
      <path
        d="M 156 176 L 100 68"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Crown / W crossbar */}
      <path
        d="M 56 156 L 82 118 L 100 144 L 118 118 L 144 156"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
