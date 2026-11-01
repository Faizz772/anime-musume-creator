type RoleBadgeProps = {
  role: "Owner" | "Admin";
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const isOwner = role === "Owner";

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold ${
        isOwner
          ? "border-accent bg-accent text-night"
          : "border-accent/30 bg-accent/10 text-accent"
      }`}
    >
      {role}
    </span>
  );
}
