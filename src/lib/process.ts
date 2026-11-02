import { buyerProtection } from "@/data/buyer-protection";
import { dueDiligenceItems, escrow, firstFortyEightHours, handoverNextSteps, threeSteps, verificationSteps } from "@/data/process";
import type { EscrowConfig } from "./types";

const fillEscrow = (text: string) => text.replace("{inspectionDays}", String(escrow.inspectionPeriodDays));

const escrowFilled: EscrowConfig = {
  ...escrow,
  stages: escrow.stages.map((s) => ({ ...s, detail: fillEscrow(s.detail) })),
};

export function getEscrow(): EscrowConfig {
  return escrowFilled;
}

export function getThreeSteps() {
  return threeSteps;
}

export function getVerificationSteps() {
  return verificationSteps;
}

export function getDueDiligenceItems() {
  return dueDiligenceItems;
}

export function getFirstFortyEightHours() {
  return firstFortyEightHours;
}

export function getHandoverNextSteps() {
  return handoverNextSteps;
}

const fillProtection = (text: string) => text.replaceAll("{transferWindowDays}", String(buyerProtection.transferWindowDays));

export function getBuyerProtection() {
  return {
    ...buyerProtection,
    covered: buyerProtection.covered.map((c) => ({ ...c, detail: fillProtection(c.detail) })),
    notCovered: buyerProtection.notCovered.map((c) => ({ ...c, detail: fillProtection(c.detail) })),
    remedies: buyerProtection.remedies.map((r) => ({ ...r, detail: fillProtection(r.detail) })),
  };
}
