/**
 * Repeating leaf motif used as a decorative backdrop on every light section.
 * Drop it as the first child of any `relative` section with a light
 * background — it sits behind the section's own content automatically since
 * everything else in these sections is stacked with `relative z-*`/`relative`.
 */
export function LeafPattern() {
  return (
    <div
      aria-hidden="true"
      className="sg-gridlines pointer-events-none absolute inset-0"
    />
  );
}
