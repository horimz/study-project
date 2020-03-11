import { useState, useCallback } from "react";

const useToggle = (defaultValue: boolean) => {
  const [value, setValue] = useState(defaultValue);
  const onToggle = useCallback(() => {
    setValue(!value);
  }, [value]);
  return [value, onToggle] as [boolean, typeof onToggle];
};

export { useToggle };
