import React from "react";
import { useModeContext } from "../../contexts/ModeContext";
import Switch from "@material-ui/core/Switch";

const SwitchMode = () => {
  const { darkMode, setDarkMode } = useModeContext();

  const handleDarkModeToggle = () => {
    setDarkMode((darkMode) => !darkMode);
  };

  return <Switch checked={darkMode} onChange={handleDarkModeToggle} />;
};

export default SwitchMode;
