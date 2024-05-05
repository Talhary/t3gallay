'use client'
import { useTheme } from "next-themes";
import { CiDark } from "react-icons/ci"

export const ThemeChange = () => {
   const { setTheme, resolvedTheme } = useTheme();
   console.log(resolvedTheme)
    return (
    <button className="absolute" onClick={()=>{
        console.log(resolvedTheme)
        if(resolvedTheme == 'dark')
        return setTheme('light')
        setTheme('dark')
    }}>
        {resolvedTheme=='dark'?<><CiDark color="white" size={50} /></>:<><CiDark size={50} /></>}
    </button>
  )
}