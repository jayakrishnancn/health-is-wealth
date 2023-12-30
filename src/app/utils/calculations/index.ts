import { bmi } from './bmi';
import { idealWeight } from './idealWeight';
import { mortalityRisk } from './mortalityRisk';
import { CalculateResultType, Measurements } from './type';



const methods = [
  bmi,
  idealWeight,
  mortalityRisk
]



export const calculateResults = (inputs: Measurements): CalculateResultType[] => {
  return methods.map(method => method(inputs)).filter(Boolean) as CalculateResultType[];
}