'use client';
import { ThemeProvider } from "next-themes";
export function Themeroviders({children}:{children:React.ReactNode}){
    return <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        {children}
    </ThemeProvider>
}