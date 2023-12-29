

export enum Inputs {
    HeightInCM = "heightInCM",
    WeightInKg = "weightInKg",
    WaistInCm = "waistInCM",
    Sex = "sex"
}

export type Measurements = {
    heightInCM: number;
    weightInKg: number;
    waistInCM: number;
    sex: 'Male' | 'Female'
}

export type CalculationMethodResult = {
    name: string; // ID 
    label: string;
    result: number | string;
    Unit: string;
    expected: number | string;
    notes_or_details: string;
}


export type CalculateResultType = { indicator: string; methods: CalculationMethodResult[] };
