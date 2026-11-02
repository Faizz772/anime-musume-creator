type RoleBadgeProps = {
  role: "Owner" | "Admin";
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const isOwner = role === "Owner";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
        isOwner
          ? "border-accent bg-accent text-night"
          : "border-accent/30 bg-accent/10 text-accent"
      }`}
    >
      {role}
    </span>
  );
}
