import { CalculateResultType, CalculationMethodResult, HealthRiskColorCode, Inputs, Measurements } from "./type";
import { validateInputs } from "./utils";

const isValidInputs = validateInputs([Inputs.HeightInCM, Inputs.HipInCm, Inputs.Sex, Inputs.Age])

const getBAIStatus = (bai: number, age: number, sex: "Female" | "Male"): "Underweight" | "Healthy" | "Overweight" | null => {
    if (sex === "Female") {
        if (age >= 20 && age < 40) {
            return bai < 21 ? "Underweight" : bai < 33 ? "Healthy" : "Overweight";
        }
        if (age < 60) {
            return bai < 23 ? "Underweight" : bai < 35 ? "Healthy" : "Overweight";
        }
        if (age < 80) {
            return bai < 25 ? "Underweight" : bai < 38 ? "Healthy" : "Overweight";
        }
        return null;
    }

    if (age >= 20 && age < 40) {
        return bai < 8 ? "Underweight" : bai < 21 ? "Healthy" : "Overweight";
    }
    if (age < 60) {
        return bai < 11 ? "Underweight" : bai < 23 ? "Healthy" : "Overweight";
    }
    if (age < 80) {
        return bai < 13 ? "Underweight" : bai < 25 ? "Healthy" : "Overweight";
    }

    return null
}

const getNormalRangeBAI = (bai: number, age: number, sex: "Female" | "Male"): { min: number, max: number } | null => {
    if (sex === "Female") {
        if (age >= 20 && age < 40) {
            return { min: 21, max: 33 }
        }
        if (age < 60) {
            return { min: 23, max: 35 }
        }
        if (age < 80) {
            return { min: 25, max: 38 }
        }
        return null;
    }

    if (age >= 20 && age < 40) {
        return { min: 8, max: 21 }
    }
    if (age < 60) {
        return { min: 11, max: 23 }
    }
    if (age < 80) {
        return { min: 13, max: 25 }
    }
    return null;
}

export const bai = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    const heightInM = inputs.heightInCM / 100;
    const bai = (inputs.hipInCM / (heightInM ** 1.5)) - 18

    const status = getBAIStatus(bai, inputs.age, inputs.sex);
    const normalBAI = getNormalRangeBAI(bai, inputs.age, inputs.sex)

    const colorCode = status === "Healthy" ? HealthRiskColorCode.Average : HealthRiskColorCode.High
    const methods = [{
        name: "BAI",
        label: "Body Adiposity Index",
        result: bai,
        Unit: "-",
        notes_or_details: normalBAI ? `BAI should be from ${normalBAI.min} to ${normalBAI.max}` : "",
        status: status,
        colorCode
    }] as CalculationMethodResult[]



    return { indicator: "Body Fat", methods }

}