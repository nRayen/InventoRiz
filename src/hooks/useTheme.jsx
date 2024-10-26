"use client"
import { createContext, useContext, useState } from "react"



export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {


    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme (theme == 'light' ? 'dark' : 'light')
    }

    let contextData = {theme, toggleTheme}



    return (
        <ThemeContext.Provider value={contextData}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);