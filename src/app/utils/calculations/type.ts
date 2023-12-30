export enum Inputs {
    HeightInCM = "heightInCM",
    WeightInKg = "weightInKg",
    WaistInCm = "waistInCM",
    Sex = "sex",
    Age = "age",
}

export type Measurements = {
    heightInCM: number;
    weightInKg: number;
    waistInCM: number;
    sex: "Male" | "Female";
    age: number;
};

export enum ColorCode {
    VeryLow = "VeryLow",
    Low = "Low",
    Average = "Average",
    High = "High",
    VeryHigh = "VeryHigh",
}

export type CalculationMethodResult = {
    name: string; // ID
    label: string;
    result: number | string;
    Unit: string;
    status: number | string;
    notes_or_details: string;
    colorCode?: ColorCode;
};

export type CalculateResultType = {
    indicator: string;
    methods: CalculationMethodResult[];
};


export const inverseColorCode = (code: ColorCode) => {
    const index = [ColorCode.VeryLow, ColorCode.Low, ColorCode.Average, ColorCode.High, ColorCode.VeryHigh].findIndex(i => i === code)
    return [ColorCode.VeryHigh, ColorCode.High, ColorCode.Average, ColorCode.Low, ColorCode.VeryLow][index];
}