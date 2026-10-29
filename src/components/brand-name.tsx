/** Business name in the display font, last word in the accent color ("083 Suplementos"). */
export function BrandName({ name, className = '' }: { name: string; className?: string }) {
  const words = name.trim().split(/\s+/);
  const last = words.length > 1 ? words.pop() : undefined;
  return (
    <span className={`font-display tracking-wide uppercase ${className}`}>
      {words.join(' ')}
      {last && <span className="text-accent"> {last}</span>}
    </span>
  );
}
