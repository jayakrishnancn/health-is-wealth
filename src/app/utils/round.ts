
export const round = (val: number) => !val || isNaN(val) ? 0 : Math.round(val * 100) / 100; 