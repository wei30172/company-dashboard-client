import { useState, useEffect } from "react";

const getLocalValue = <T>(key: string, initValue: T) => {
  //SSR Next.js
  if (typeof window === "undefined") return initValue;

  // if a value is already store
  const localValue = localStorage.getItem(key);
  if (localValue) {
    return JSON.parse(localValue);
  }

  // return result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = <T>(key: string, initValue: T) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
