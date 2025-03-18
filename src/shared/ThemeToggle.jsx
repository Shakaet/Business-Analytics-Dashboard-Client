import React, { useContext } from "react";

import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Heroicons for Icons
import { Context } from "../provider/AuthProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(Context);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
    >
      {theme === "dark" ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
