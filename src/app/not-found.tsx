import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="sg-grain relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-white px-6 py-32 text-center">
      <div
        aria-hidden="true"
        className="sg-gridlines pointer-events-none absolute inset-0"
      />
      <div className="relative">
        <p className="sg-eyebrow mb-6 justify-center text-sg-red">404</p>
        <h1 className="font-display text-4xl font-semibold text-sg-dark-ink md:text-6xl">
          This star isn&apos;t on the map.
        </h1>
        <p className="mx-auto mt-5 max-w-[44ch] text-sg-dark-muted">
          The page you were looking for doesn&apos;t exist — or it moved to another part
          of the constellation.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-sg-red px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-sg-red-bright hover:shadow-[0_10px_40px_-8px_rgba(224,20,44,0.6)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Star Groups
        </Link>
      </div>
    </section>
  );
}
