export enum Inputs {
    HeightInCM = "heightInCM",
    WeightInKg = "weightInKg",
    WaistInCm = "waistInCM",
    Sex = "sex",
    Age = "age",
    HipInCm = "hipInCM",
}

export type Measurements = {
    heightInCM: number;
    weightInKg: number;
    waistInCM: number;
    sex: "Male" | "Female";
    age: number;
    hipInCM: number;
};

export enum HealthRiskColorCode {
    VeryLow = "VeryLow",
    Low = "Low",
    Average = "Average",
    High = "High",
    VeryHigh = "VeryHigh",
    UNKNOWN = "unknown"
}

export type CalculationMethodResult = {
    name: string; // ID
    label: string;
    result: number | string;
    Unit: string;
    status: number | string;
    notes_or_details: string;
    colorCode?: HealthRiskColorCode;
};

export type CalculateResultType = {
    indicator: string;
    methods: CalculationMethodResult[];
};


export const inverseColorCode = (code: HealthRiskColorCode) => {
    const index = [HealthRiskColorCode.VeryLow, HealthRiskColorCode.Low, HealthRiskColorCode.Average, HealthRiskColorCode.High, HealthRiskColorCode.VeryHigh].findIndex(i => i === code)
    return [HealthRiskColorCode.VeryHigh, HealthRiskColorCode.High, HealthRiskColorCode.Average, HealthRiskColorCode.Low, HealthRiskColorCode.VeryLow][index];
}