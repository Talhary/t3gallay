"use client";
import { useTheme } from "next-themes";
import { CiDark } from "react-icons/ci";

export const ThemeChange = () => {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <button
      className="absolute z-40"
      onClick={() => {
        if (resolvedTheme == "dark") return setTheme("light");
        setTheme("dark");
      }}
    >
      {resolvedTheme == "dark" ? (
        <>
          <CiDark color="white" size={50} />
        </>
      ) : (
        <>
          <CiDark size={50} />
        </>
      )}
    </button>
  );
};
