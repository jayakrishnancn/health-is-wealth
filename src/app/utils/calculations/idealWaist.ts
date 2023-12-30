import { CalculateResultType, CalculationMethodResult, HealthRiskColorCode, Inputs, Measurements } from "./type";
import { validateInputs } from "./utils";

const isValidInputs = validateInputs([Inputs.HeightInCM])

export const idealWaist = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    // https://www.sciencedirect.com/topics/nursing-and-health-professions/waist-to-height-ratio
    const idealRatio = 0.5
    const result = idealRatio * inputs.heightInCM
    let colorCode = HealthRiskColorCode.UNKNOWN;
    let status = "Please fill the waist to know the current status";

    if (inputs.waistInCM) {
        const currentRatio = inputs.waistInCM / inputs.heightInCM
        colorCode = currentRatio < 0.5 ? HealthRiskColorCode.Average : currentRatio < 0.6 ? HealthRiskColorCode.High : HealthRiskColorCode.VeryHigh;
        status = colorCode === HealthRiskColorCode.Average ? "OK" : HealthRiskColorCode.High ? "Health risk" : "Very high health risk"
    }

    const methods = [{
        name: "Waist to Height Ratio",
        label: "Ideal Waist based on Waist to Height Ratio",
        result,
        Unit: "cm",
        notes_or_details: "Ideal ratio = 0.5, for adults and children over 5 years old",
        status,
        colorCode
    }] as CalculationMethodResult[]



    return { indicator: "Ideal Waist", methods }

}