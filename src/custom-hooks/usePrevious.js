import React, { useEffect, useRef } from "react";

//custom react hook for keeping prv state/props
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious