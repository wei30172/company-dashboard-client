import useLocalStorage from "./useLocalStorage";

const useInput = <T>(key: string, initValue: T) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      setValue(target.value);
    },
  };

  return [value, reset, attributeObj];
};

export default useInput;
