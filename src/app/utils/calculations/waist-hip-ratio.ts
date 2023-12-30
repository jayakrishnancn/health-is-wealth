import { CalculateResultType, CalculationMethodResult, Measurements } from "./type";

const isValidInputs = (inputs: Measurements) => inputs.waistInCM && inputs.sex

export const waist_hip_ratio = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    const idealRatio = inputs.sex === "Female" ? 0.85 : 0.90
    const result = idealRatio * inputs.waistInCM

    const methods = [{
        name: "waist to hip ratio",
        label: "waist to hip ratio",
        result,
        Unit: "cm",
        status: "Ideal ratio for Female = 0.85 , Male = 0.90",
        notes_or_details: "Ratio = W / H. https://www.omnicalculator.com/health/waist-hip-ratio"
    }] as CalculationMethodResult[]



    return { indicator: "Ideal Hip", methods }

}