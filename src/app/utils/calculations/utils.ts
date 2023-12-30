import { Inputs, Measurements } from "./type";

export const validateInputs =
    (requiredFields: Inputs[]) => (input: Measurements) => {
        const minValues = {
            [Inputs.Age]: 2,
            [Inputs.HeightInCM]: 50,
            [Inputs.WaistInCm]: 50,
            [Inputs.WeightInKg]: 40,
            [Inputs.HipInCm]: 30,
        } as { [key: string]: number };

        return !requiredFields.some(
            (field) =>
                !input[field] ||
                (minValues[field] !== undefined &&
                    Number(input[field]) < minValues[field])
        );
    };
