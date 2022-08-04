import React, { useState } from "react";

const InputWrapper: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    focused?: boolean;
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  }
> = ({ handleChange, ...props }) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);

  return (
    <input
      {...props}
      onChange={handleChange}
      onBlur={handleFocus}
      data-testid={`input-${props.name}`}
      className={focused ? "focused" : ""}
    />
  );
};
export default InputWrapper;
