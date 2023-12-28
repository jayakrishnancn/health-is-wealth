export type CalculationResult = {
  indicator: string;
  current: string | number | null;
  reference: string | number | null;
};

export const calculateResults = ({
  heightInCM,
  weightInCM,
}: {
  heightInCM: number | null;
  weightInCM: number | null;
}) => [] as CalculationResult[];
