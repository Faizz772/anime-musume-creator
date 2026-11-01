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
      ? "border border-accent bg-accent text-night"
      : "border border-accent/30 bg-accent/10 text-accent";

  return (
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-lg font-heading font-bold ${tone} ${className}`}
    >
      {src ? (
        <Image src={src} alt="" fill sizes="64px" className="object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
