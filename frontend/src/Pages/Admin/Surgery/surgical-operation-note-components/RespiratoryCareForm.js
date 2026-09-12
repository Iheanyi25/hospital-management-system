import React from "react";
import { Card } from "../../../../Components/reusable-css-in-js-components";

export default function RespiratoryCareForm({respiratory, setRespiratory }) {

  const handleChange = (e, checkBoxOrRadio) => {
    if (checkBoxOrRadio) {
      setRespiratory({
        ...respiratoryCare,
        [checkBoxOrRadio]: !respiratoryCare[checkBoxOrRadio],
      });
    } else {
      setRespiratory({ ...respiratory, [e.target.name]: e.target.value });
    }
  };

  console.log(respiratory,5555)

  const { respiratoryCare } = respiratory;

  return (
    <div style={{ flex: 1}}>
      <Card>
        <h4>Respiratory care</h4>
        <textarea
          className="form-control"
          placeholder="Respiratory care"
          rows={20}
          type="text"
            onChange={handleChange}
            value={respiratoryCare}
            name="respiratoryCare"
        />
      </Card>
    </div>
  );
}
