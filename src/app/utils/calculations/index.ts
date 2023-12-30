import { bmi } from './bmi';
import { idealWaist } from './idealWaist';
import { idealWeight } from './idealWeight';
import { mortalityRisk } from './mortalityRisk';
import { CalculateResultType, Measurements } from './type';
import { waist_hip_ratio } from './waist-hip-ratio';



const methods = [
  bmi,
  idealWeight,
  mortalityRisk,
  waist_hip_ratio,
  idealWaist
]



export const calculateResults = (inputs: Measurements): CalculateResultType[] => {
  return methods.map(method => method(inputs)).filter(Boolean) as CalculateResultType[];
}