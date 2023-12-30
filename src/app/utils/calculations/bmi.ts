import { round } from "../round";
import { CalculateResultType, CalculationMethodResult, ColorCode, Measurements } from "./type";

const isValidInputs = (inputs: Measurements) => inputs.heightInCM && inputs.weightInKg;

export const bmi = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
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

    const colorCode = status === "Normal weight" ? ColorCode.Average : status === "Overweight" ? ColorCode.Low : ColorCode.VeryLow

    const methods = [{
        name: "BMI",
        label: "Body Mass Index",
        result: bmi,
        Unit: "-",
        notes_or_details: "Expected 18.5 - 24.9",
        status: status,
        colorCode
    }] as CalculationMethodResult[]



    return { indicator: "BMI", methods }

}