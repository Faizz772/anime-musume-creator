import { Blossom } from "./blossom";

type BlossomSpinProps = {
  className?: string;
};

export function BlossomSpin({ className = "" }: BlossomSpinProps) {
  return (
    <div className={className} aria-hidden="true">
      <div className="blossom-spin">
        <Blossom className="size-full" />
      </div>
    </div>
  );
}
