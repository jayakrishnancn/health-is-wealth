
import ABSIData from './data/ABSIMeanAndSD-compiled.json';
import { CalculateResultType, CalculationMethodResult, HealthRiskColorCode, Inputs, Measurements } from "./type";
import { validateInputs } from './utils';
const isValidInputs = validateInputs([Inputs.HeightInCM, Inputs.WeightInKg, Inputs.WaistInCm, Inputs.Age])

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

    const meanABSIZScore = Number(gender == "Female" ? ABSIForAge.SmoothMeanABSIFemale : ABSIForAge.SmoothMeanABSIMale)
    const standardDeviationABSIZScore = Number(gender == "Female" ? ABSIForAge.SmoothSDABSIFemale : ABSIForAge.SmoothSDABSIMale)

    // Z-Score formula: z = (X - μ) / σ
    const zScore = (absi - meanABSIZScore) / standardDeviationABSIZScore;
    return zScore;
}


function statusBasedOnZScore(zScore: number): HealthRiskColorCode {
    return zScore < -0.868 ? HealthRiskColorCode.VeryLow : zScore < -0.272 ? HealthRiskColorCode.Low : zScore < 0.229 ? HealthRiskColorCode.Average : zScore < 0.798 ? HealthRiskColorCode.High : HealthRiskColorCode.VeryHigh;
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

    const status = absiZScore ? statusBasedOnZScore(absiZScore) : HealthRiskColorCode.Average;


    methods.push({
        name: "ABSI z score",
        label: "Estimates the risk of premature mortality",
        result: absiZScore ?? "Error Invalid Inputs, Check waist and age fields.",
        Unit: "-",
        status,
        notes_or_details: "based on https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0039504#pone.0039504.s001",
        colorCode: status
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