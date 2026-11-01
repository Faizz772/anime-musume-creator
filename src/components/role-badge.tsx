type RoleBadgeProps = {
  role: "Owner" | "Admin";
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const isOwner = role === "Owner";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
        isOwner
          ? "border-pink/40 bg-pink/10 text-blossom"
          : "border-purple/40 bg-purple/10 text-purple"
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${isOwner ? "bg-pink" : "bg-purple"}`}
      />
      {role}
    </span>
  );
}
