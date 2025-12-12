export const LEAD_STATUS = {
  VERIFIED: 'Verified',
  TO_CHECK: 'To Check',
  ALL: 'All',
};

export const STATUS_COLORS = {
  [LEAD_STATUS.VERIFIED]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-500',
  },
  [LEAD_STATUS.TO_CHECK]: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-500',
  },
};

