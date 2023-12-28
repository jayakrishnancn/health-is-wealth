import React from "react";
import {
  TableBody,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
import { calculateResults } from "../utils/resultCalculator";

type ResultsType = {
  heightInCM: number;
  weightInCM: number;
};

export default function Results({ heightInCM, weightInCM }: ResultsType) {
  const results = calculateResults({ heightInCM, weightInCM });
  return (
    <TableContainer component={Paper}>
      <Table size="small"> 
        <TableHead>
          <TableRow>
            <TableCell> Indicator </TableCell>
            <TableCell> Current </TableCell>
            <TableCell> Reference </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.length > 0 ? (
            results.map(({ indicator, current, reference }) => (
              <TableRow key={indicator}>
                <TableCell> {indicator} </TableCell>
                <TableCell> {current ?? "-"} </TableCell>
                <TableCell> {reference ?? "-"} </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key="error">
              <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                {" "}
                No Results found.{" "}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
