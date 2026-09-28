export default function ComingSoon() {
  return (
    <main className="relative flex flex-1 min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="glow pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2" />

      <div className="fade-in relative flex flex-col items-center gap-8">
        <span className="gold-line h-px w-24 sm:w-40" />
        <h1 className="gold-text font-display text-center text-5xl font-light uppercase tracking-[0.3em] sm:text-7xl md:text-8xl">
          Coming Soon
        </h1>
        <span className="gold-line h-px w-24 sm:w-40" />
      </div>
    </main>
  );
}
