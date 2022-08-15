import useLocalStorage from "./useLocalStorage";

const useToggle = <T>(key: string, initValue: T) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const toggle = (value: T) => {
    setValue((prev: T) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };

  return [value, toggle];
};

export default useToggle;
