/**
 * Layered gold/navy glow used behind dark hero and CTA sections to replace
 * the flat single-color background with something that reads as premium
 * rather than plain. Pure CSS — no image dependency.
 */
export function GlossyBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-40 right-[-12%] h-[560px] w-[560px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.32), transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-25%] left-[-12%] h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(52,98,158,0.4), transparent 70%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05), transparent 45%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
