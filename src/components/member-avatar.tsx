import Image from "next/image";

type MemberAvatarProps = {
  initials: string;
  src?: string;
  variant?: "solid" | "quiet";
  className?: string;
};

export function MemberAvatar({
  initials,
  src,
  variant = "solid",
  className = "",
}: MemberAvatarProps) {
  const tone =
    variant === "solid"
      ? "bg-accent text-ice ring-accent/40"
      : "bg-surface-2 text-accent-2 ring-white/10";

  return (
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full font-heading font-bold ring-1 ${tone} ${className}`}
    >
      {src ? (
        <Image src={src} alt="" fill sizes="96px" className="object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
