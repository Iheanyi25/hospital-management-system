
import "./row.css";
import { Button } from "../button/Button";

const Row = ({
  title,
  label,
  onClick,
  buttonClass,
  id
}) => {


  return (
    <div className="row_container d-flex justify-content-between align-items-center px-4 py-2">
      <p>{title}</p>
      <Button
        label={label}
        buttonClass={buttonClass}
        onClick={onClick}
        data-cy={id}
      />
    </div>
  )
}

export { Row };