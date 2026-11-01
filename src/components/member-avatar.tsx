type MemberAvatarProps = {
  initials: string;
  variant?: "solid" | "quiet";
  className?: string;
};

export function MemberAvatar({
  initials,
  variant = "solid",
  className = "",
}: MemberAvatarProps) {
  const tone =
    variant === "solid"
      ? "border border-accent bg-accent text-night"
      : "border border-accent/30 bg-accent/10 text-accent";

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-lg font-heading font-bold ${tone} ${className}`}
    >
      {initials}
    </span>
  );
}
