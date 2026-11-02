/**
 * Marks placeholder people and stories while `sample: true` in the data, so
 * sample content can't be mistaken for real testimony if it ships by accident.
 * Disappears once the data is replaced and the flag is set to false.
 */
export function SampleTag({ sample }: { sample: boolean }) {
  if (!sample) return null;
  return (
    <span className="ml-1.5 inline-flex translate-y-px items-center rounded border border-line-strong px-1.5 py-px align-middle text-xs font-medium text-fg-subtle">
      Sample
    </span>
  );
}
