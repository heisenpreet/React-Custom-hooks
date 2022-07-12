import { useState, useCallback } from "react";

export default function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = useCallback((value) => {
    setValue((prevValue) => (typeof value === "boolean" ? value : !prevValue));
  }, []);
  return [value, toggleValue];
}
