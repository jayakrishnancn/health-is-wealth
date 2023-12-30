import {
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { calculateResults } from "../utils/calculations";
import { CalculateResultType, Measurements } from "../utils/calculations/type";
import { round } from "../utils/round";
import Select from "./Select";

type ResultsPropType = Partial<Measurements> & {};

export default function Results({
  heightInCM,
  weightInKg: weightInCM,
  waistInCM,
  sex,
  age,
  hipInCM,
}: ResultsPropType) {
  const results: CalculateResultType[] = calculateResults({
    heightInCM: heightInCM || 0,
    weightInKg: weightInCM || 0,
    waistInCM: waistInCM || 0,
    sex: sex ?? "Male",
    age: age ?? 0,
    hipInCM: hipInCM ?? 0,
  });

  const [selectedMethods, setSelectedMethods] = useState<{
    [key: string]: string;
  }>({});
  const handleChangeMethod = (
    indicator: string,
    e: SelectChangeEvent<string>
  ) => {
    setSelectedMethods((prev) => ({
      ...prev,
      [indicator]: e.target.value,
    }));
  };

  return (
    <Table size="small" sx={{ tableLayout: "fixed" }}>
      <TableHead>
        <TableRow>
          <TableCell> Indicator </TableCell>
          <TableCell> Method </TableCell>
          <TableCell> Result </TableCell>
          <TableCell> Unit </TableCell>
          <TableCell> Status </TableCell>
          <TableCell> Notes </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results?.length > 0 ? (
          results.map(({ indicator, methods }) => {
            const obj = methods.find((i, index) =>
              selectedMethods[indicator]
                ? i.name === selectedMethods[indicator]
                : index === 0
            );
            return (
              <TableRow
                className={obj?.colorCode ? `row-${obj?.colorCode}` : ""}
                key={indicator}
              >
                <TableCell> {indicator} </TableCell>
                <TableCell>
                  <Select
                    label="Methods"
                    name="methods"
                    onChange={(e) => handleChangeMethod(indicator, e)}
                    value={
                      selectedMethods[indicator] ?? methods?.[0]?.name ?? ""
                    }
                    options={methods.map((i) => i.name)}
                  />
                </TableCell>
                <TableCell>
                  {isNaN(Number(obj?.result))
                    ? obj?.result
                    : round(Number(obj?.result))}
                </TableCell>
                <TableCell>{obj?.Unit}</TableCell>
                <TableCell>{obj?.status}</TableCell>
                <TableCell>{obj?.notes_or_details}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow key="error">
            <TableCell colSpan={6} sx={{ textAlign: "center" }}>
              No Results found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
