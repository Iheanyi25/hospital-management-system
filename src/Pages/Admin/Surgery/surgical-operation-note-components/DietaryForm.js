import React from 'react'
import { Card } from '../../../../Components/reusable-css-in-js-components'

export default function DietaryForm({dietaryState, setDietary }) {

  const handleChange = (e, checkBoxOrRadio) => {
    if (checkBoxOrRadio) {
      setDietary({
        ...dietaryState,
        [checkBoxOrRadio]: !dietaryState[checkBoxOrRadio],
      });
    } else {
      setDietary({ ...dietaryState, [e.target.name]: e.target.value });
    }
  };

  const {  dietary } = dietaryState;

    return (
        <div>
            <Card>
              <h4>Dietary</h4>
              <textarea
                className="form-control"
                placeholder="write dietary"
                rows={10}
                onChange={handleChange}
                value={dietary}
                name="dietary"
              />
            </Card>
          </div>
    )
}
