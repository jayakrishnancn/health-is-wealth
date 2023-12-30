import { round } from "../round";
import { bmiCalculations } from "./bmi";
import { CalculateResultType, CalculationMethodResult, HealthRiskColorCode, Inputs, Measurements } from "./type";
import { validateInputs } from "./utils";

const isValidInputs = validateInputs([Inputs.HeightInCM])


function robinsonFormula(heightCm: number, sex: string): number {

    const heightIn = heightCm / 2.54;
    let weightKg: number;

    if (sex.toLowerCase() === "female") {
        weightKg = 49 + (1.7 * (heightIn - 60));
    } else {
        weightKg = 52 + (1.9 * (heightIn - 60));
    }

    return weightKg;
}

function millerFormula(height: number, sex: string): number {
    let idealWeight: number;

    if (sex === "Female") {
        idealWeight = 53.1 + 1.36 * ((height / 100) - 1.52);
    } else {
        idealWeight = 56.2 + 1.41 * ((height / 100) - 1.52);
    }

    return idealWeight;
}

function hamwiFormula(height: number, sex: string): number {
    let idealWeight: number;

    if (sex.toLowerCase() === "female") {
        idealWeight = 45.5 + 2.2 * (height / 2.54 - 60);
    } else {
        idealWeight = 48 + 2.7 * (height / 2.54 - 60);
    }

    return Math.round(idealWeight);
}


function devineFormula(height: number, sex: string): number {
    let idealWeight: number;

    if (sex.toLowerCase() === "female") {
        idealWeight = 45.5 + 2.3 * (height / 2.54 - 60);
    } else {
        idealWeight = 50 + 2.3 * (height / 2.54 - 60);
    }

    return Math.round(idealWeight);
}

function brocaFormula(height: number, sex: string): number {
    return Math.round((height - 100));
}

function lorentzFormula(height: number, sex: string): number {
    let idealWeight: number;

    if (sex.toLowerCase() === "female") {
        idealWeight = height - 100 - (height - 150) / 2;
    } else {
        idealWeight = height - 100 - (height - 150) / 4;
    }

    return Math.round(idealWeight);
}

export const idealWeight = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    const bmiNormalLB = 18.5;
    const bmiNormalUB = 24.9;
    const height = inputs.heightInCM / 100;
    const weightLB = round(bmiNormalLB * height * height)
    const weightUB = round(bmiNormalUB * height * height);



    const bmi = bmiCalculations(inputs);
    const methods: CalculationMethodResult[] = [{
        ...bmi,
        name: "Based on BMI",
        label: "Ideal Weight AS per BMI",
        Unit: "Kg",
        result: `${weightLB} - ${weightUB}`,
        notes_or_details: `You are ${bmi.status}. expected weight is between ${weightLB}Kg and ${weightUB}Kg.`,
    }];

    if (inputs.sex) {

        methods.push({
            name: "Robinson formula",
            label: "Robinson formula",
            Unit: "Kg",
            result: robinsonFormula(inputs.heightInCM, inputs.sex),
            notes_or_details: "",
            status: ""
        })
        methods.push({
            name: "Miller formula",
            label: "Miller formula",
            Unit: "Kg",
            result: millerFormula(inputs.heightInCM, inputs.sex),
            notes_or_details: "",
            status: ``
        })
        methods.push({
            name: "Hamwi formula",
            label: "Hamwi formula",
            Unit: "Kg",
            result: hamwiFormula(inputs.heightInCM, inputs.sex),
            notes_or_details: "",
            status: ``
        })
        methods.push({
            name: "Devine formula",
            label: "Devine formula",
            Unit: "Kg",
            result: devineFormula(inputs.heightInCM, inputs.sex),
            notes_or_details: "",
            status: ``
        })
        methods.push({
            name: "Broca formula",
            label: "Broca formula",
            Unit: "Kg",
            result: brocaFormula(inputs.heightInCM, inputs.sex),
            notes_or_details: "",
            status: ``
        })
        methods.push({
            name: "Lorentz formula",
            label: "Lorentz formula",
            Unit: "Kg",
            result: lorentzFormula(inputs.heightInCM, inputs.sex),
            notes_or_details: "",
            status: ``,
        })

        if (validateInputs([Inputs.WeightInKg])(inputs)) {
            methods.forEach(method => {
                const ideal = Number(method.result);
                if (method.result && ideal > 10 && !method.colorCode) {
                    method.colorCode = inputs.weightInKg <= ideal ? HealthRiskColorCode.Average : HealthRiskColorCode.High;
                    method.status = method.colorCode === HealthRiskColorCode.High ? "High" : "Normal";
                    method.notes_or_details = method.status === HealthRiskColorCode.High ? "Reduce weight, ideal weight should be less than " + ideal + " Kg." : "-"
                }
            })
        }

    }


    return { indicator: "Ideal Weight", methods }

}