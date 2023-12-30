import { round } from "../round";
import { CalculateResultType, CalculationMethodResult, HealthRiskColorCode, Inputs, Measurements } from "./type";
import { validateInputs } from "./utils";

const isValidInputs = validateInputs([Inputs.HeightInCM, Inputs.WeightInKg])

export const bmiCalculations = (inputs: Measurements): { bmi: number | null, colorCode: HealthRiskColorCode, status: string } => {

    if (!validateInputs([Inputs.WeightInKg, Inputs.HeightInCM])(inputs)) {
        return {
            status: "",
            bmi: null,
            colorCode: HealthRiskColorCode.UNKNOWN
        }
    }
    const weight = inputs.weightInKg;
    const height = inputs.heightInCM / 100;
    const bmi = round(weight / (height * height))
    const status = bmi < 18.5 ? "Underweight"
        : bmi < 25 ? "Normal weight"
            : bmi < 30 ? "Overweight"
                : bmi < 35 ? "Obesity (Class I)"
                    : bmi < 40 ? "Obesity (Class II)"
                        : "Morbid Obesity (Class III)";
    const colorCode = status === "Normal weight" ? HealthRiskColorCode.Average : status === "Overweight" ? HealthRiskColorCode.High : HealthRiskColorCode.VeryHigh
    return {
        status,
        colorCode,
        bmi,
    }
}

export const bmi = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }


    const { bmi, colorCode, status } = bmiCalculations(inputs)


    const methods = [{
        name: "BMI",
        label: "Body Mass Index",
        result: bmi,
        Unit: "-",
        notes_or_details: "Expected BMI is between 18.5 and 24.9",
        status: status,
        colorCode
    }] as CalculationMethodResult[]



    return { indicator: "BMI", methods }

}