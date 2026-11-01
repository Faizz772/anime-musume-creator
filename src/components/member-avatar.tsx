type MemberAvatarProps = {
  initials: string;
  tone?: "pink" | "purple";
  className?: string;
};

export function MemberAvatar({
  initials,
  tone = "pink",
  className = "",
}: MemberAvatarProps) {
  const gradient =
    tone === "pink"
      ? "from-pink to-purple"
      : "from-purple to-pink/70";

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-heading font-extrabold text-night ${gradient} ${className}`}
    >
      {initials}
    </span>
  );
}
