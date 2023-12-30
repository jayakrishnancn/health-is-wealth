
import ABSIData from './data/ABSIMeanAndSD-compiled.json';
import { CalculateResultType, CalculationMethodResult, ColorCode, Measurements, inverseColorCode } from "./type";
const isValidInputs = (inputs: Measurements) => inputs.heightInCM && inputs.weightInKg && inputs.waistInCM && inputs.age

function calculateABSI(heightInMeters: number, weightInKg: number, waistInMeters: number): number {
    // ABSI formula: ABSI = WC / (BMI ^ (2/3) * height^(1/2))
    const bmi = weightInKg / (heightInMeters ** 2);
    const absi = waistInMeters / ((bmi ** (2 / 3)) * (heightInMeters ** (1 / 2)));
    return absi;
}

function calculateABSIZScore(absi: number, age: number, gender: 'Male' | 'Female'): number | null {
    // You would need reference data for mean and standard deviation based on age and gender for ABSI to calculate z-score.
    // This data is not provided here and should be obtained from relevant research studies or sources.
    if (age < 2 && age > 85) {
        return null;
    }
    const ABSIForAge = ABSIData.find(i => Number(i.age) === age);
    if (!ABSIForAge) {
        return null
    }

    debugger;
    const meanABSIZScore = Number(gender == "Female" ? ABSIForAge.SmoothMeanABSIFemale : ABSIForAge.SmoothMeanABSIMale)
    const standardDeviationABSIZScore = Number(gender == "Female" ? ABSIForAge.SmoothSDABSIFemale : ABSIForAge.SmoothSDABSIMale)

    // Z-Score formula: z = (X - μ) / σ
    const zScore = (absi - meanABSIZScore) / standardDeviationABSIZScore;
    return zScore;
}


function statusBasedOnZScore(zScore: number): ColorCode {
    return zScore < -0.868 ? ColorCode.VeryLow : zScore < -0.272 ? ColorCode.Low : zScore < 0.229 ? ColorCode.Average : zScore < 0.798 ? ColorCode.High : ColorCode.VeryHigh;
}



export const mortalityRisk = (inputs: Measurements): CalculateResultType | null => {

    if (!isValidInputs(inputs)) {
        return null;
    }

    const heightInMeters = inputs.heightInCM / 100;
    const waistInMeters = inputs.waistInCM / 100;
    const absi = calculateABSI(heightInMeters, inputs.weightInKg, waistInMeters)


    const methods = [] as CalculationMethodResult[]


    const absiZScore = calculateABSIZScore(absi, inputs.age, inputs.sex);

    const status = absiZScore ? statusBasedOnZScore(absiZScore) : ColorCode.Average;

    const colorCode = inverseColorCode(status)

    methods.push({
        name: "ABSI z score",
        label: "Estimates the risk of premature mortality",
        result: absiZScore ?? "Error Invalid Inputs, Check waist and age fields.",
        Unit: "-",
        status,
        notes_or_details: "based on https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0039504#pone.0039504.s001",
        colorCode
    })


    methods.push({
        name: "ABSI",
        label: "By ABSI formula",
        result: absi,
        Unit: "-",
        status: "",
        notes_or_details: "based on https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0039504#pone.0039504.s001"
    })


    return { indicator: "Premature Mortality", methods }

}