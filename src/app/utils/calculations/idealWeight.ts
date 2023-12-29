import { round } from "../round";
import { CalculateResultType, Measurements } from "./type";

const isValidInputs = (inputs: Measurements) => inputs.heightInCM && inputs.heightInCM > 50;

export const idealWeight = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    const bmiNormalLB = 18.5;
    const bmiNormalUB = 24.9;
    const height = inputs.heightInCM / 100;
    const weightLB = round(bmiNormalLB * height * height)
    const weightUB = round(bmiNormalUB * height * height);


    const bmiMethod = {
        name: "Based on BMI",
        label: "Ideal Weight AS per BMI",
        Unit: "Kg",
        result: `${weightLB} to ${weightUB}`,
        notes_or_details: "",
        expected: `${weightLB} to ${weightUB}`,
    }

    const hamwi = {
        name: "G. J. Hamwi Formula (1964)",
        label: "G. J. Hamwi Formula (1964)",
        Unit: "Kg",
        result: 100 + inputs.heightInCM,
        notes_or_details: "",
        expected: ""
    }



    return { indicator: "IdealWeight", methods: [bmiMethod, hamwi] }

}