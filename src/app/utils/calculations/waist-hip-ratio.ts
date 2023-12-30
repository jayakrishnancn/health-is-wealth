import { CalculateResultType, CalculationMethodResult, HealthRiskColorCode, Measurements } from "./type";

const isValidInputs = (inputs: Measurements) => inputs.waistInCM && inputs.sex

export const waist_hip_ratio = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    const idealRatio = inputs.sex === "Female" ? 0.85 : 0.90
    const idealHipInCm = idealRatio * inputs.waistInCM

    const colorCode = inputs.heightInCM > 0 ? HealthRiskColorCode.UNKNOWN : inputs.hipInCM < idealHipInCm ? HealthRiskColorCode.Low : inputs.hipInCM > idealHipInCm ? HealthRiskColorCode.High : HealthRiskColorCode.Average
    const methods = [{
        name: "waist to hip ratio",
        label: "waist to hip ratio",
        result: idealHipInCm,
        Unit: "cm",
        status: "Ideal ratio for Female = 0.85 , Male = 0.90",
        notes_or_details: "Ratio = W / H. https://www.omnicalculator.com/health/waist-hip-ratio",
        colorCode
    }] as CalculationMethodResult[]



    return { indicator: "Ideal Hip", methods }

}