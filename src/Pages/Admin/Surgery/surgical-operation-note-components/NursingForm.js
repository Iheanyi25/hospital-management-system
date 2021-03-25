import React from "react";
import { Card } from "../../../../Components/reusable-css-in-js-components";
import NursingFormPartOne from "./NursingFormPartOne";
import NursingFormPartTwo from "./NursingFormPartTwo";

export default function NursingForm({
  nursingPartOne,
  setNursingPartOne,
  nursingPartTwo,
  setNursingPartTwo,
}) {
  return (
    <div style={{ flex: "1" }} className="mr-md-3">
      <Card>
        <h4>Nursing</h4>
        <NursingFormPartOne
          nursingPartOne={nursingPartOne}
          setNursingPartOne={setNursingPartOne}
        />
        <NursingFormPartTwo
          nursingPartTwo={nursingPartTwo}
          setNursingPartTwo={setNursingPartTwo}
        />
      </Card>
    </div>
  );
}
