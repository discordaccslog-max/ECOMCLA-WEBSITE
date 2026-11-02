import { included } from "@/data/included";

export function getIncluded() {
  return included;
}

export function getIncludedSummary() {
  const { store, creatives, social, supplier, support } = included;
  return [store, creatives, social, supplier, support].map(({ id, title, figure, figureLabel, summary }) => ({ id, title, figure, figureLabel, summary }));
}
