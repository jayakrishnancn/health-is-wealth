import { round } from "../round";
import { CalculateResultType, CalculationMethodResult, Measurements } from "./type";

const isValidInputs = (inputs: Measurements) => inputs.heightInCM && inputs.weightInKg;

export const bmi = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    const weight = inputs.weightInKg;
    const height = inputs.heightInCM / 100;
    const bmiResult = round(weight / (height * height))


    const methods = [{
        name: "BMI",
        label: "Body Mass Index",
        result: bmiResult,
        Unit: "",
        expected: "18.5 - 24.9",
        notes_or_details: ""
    }] as CalculationMethodResult[]



    return { indicator: "BMI", methods }

}