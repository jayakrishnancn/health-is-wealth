import { CalculateResultType, CalculationMethodResult, Inputs, Measurements } from "./type";
import { validateInputs } from "./utils";

const isValidInputs = validateInputs([Inputs.Age])

export const maxHartRate = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    const methods = [{
        name: "Haskell & Fox formula",
        label: "Haskell & Fox formula",
        result: 220 - inputs.age,
        Unit: "BPM",
        notes_or_details: "HR(max) = 220 - age",
        status: ""
    },
    {
        name: "Nes formula",
        label: "Nes formula",
        result: 211 - (0.64 * inputs.age),
        Unit: "BPM",
        notes_or_details: "HR(max) = 211 - (0.64 * age)",
        status: ""
    },
    {
        name: "Oakland nonlinear formula",
        label: "Oakland nonlinear formula",
        result: 192 - (0.007 * (inputs.age * inputs.age)),
        Unit: "BPM",
        notes_or_details: "HR(max) = 192 - (0.007 * age ^ 2)",
        status: ""
    },
    {
        name: "Tanaka, Monahan & Seals formula",
        label: "Tanaka, Monahan & Seals formula",
        result: 208 - (0.7 * inputs.age),
        Unit: "BPM",
        notes_or_details: "HR(max) = 208 - (0.7 * age)",
        status: ""
    },
    {
        name: "Inbar formula",
        label: "Inbar formula",
        result: 205.8 - (0.685 * inputs.age),
        Unit: "BPM",
        notes_or_details: "HR(max) = 205.8 - (0.685 * age)",
        status: ""
    }] as CalculationMethodResult[]



    return { indicator: "Heart Rate - Maximum", methods }

}