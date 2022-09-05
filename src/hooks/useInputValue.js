import { useState, useEffect } from "react";

function useNonEmpty() {
  const [value, setValue] = useState("");
  const [nonEmptyValue, setNonEmptyValue] = useState("");

  useEffect(() => {
    if (value !== 0 && value !== "") {
      setNonEmptyValue(value);
    }
  }, [value]);

  return [value, setValue, nonEmptyValue];
}

export default useNonEmpty;