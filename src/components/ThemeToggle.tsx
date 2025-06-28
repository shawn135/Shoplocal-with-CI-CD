"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-16 h-8 rounded-full px-1 transition-colors duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-inner hover:shadow-lg ${
        theme === "dark" ? "bg-gray-700" : "bg-yellow-400"
      } hover:ring-3 hover:ring-blue-400 hover:ring-offset-1`}
      aria-label="Toggle Theme"
    >
      <span
  className={`absolute transition-all duration-300 ease-in-out transform text-lg ${
    theme === "dark" ? "translate-x-4" : "translate-x-1-1"
  }`}
>
  {theme === "dark" ? "🌙" : "🌞"}
</span>

    </button>
  );
}
