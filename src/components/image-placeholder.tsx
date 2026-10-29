/** Shown while a section has no photo yet, so the layout stays the same. */
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-panel-soft p-6 text-center text-xs font-semibold tracking-widest text-subtle uppercase">
      {label}
    </div>
  );
}
