import { createContext, useContext, useEffect } from "react"
import { useLocalStorageState } from "./useLocalStorageState";
import PropTypes from "prop-types"; // Import PropTypes

const DarkModeChanger = createContext();

function DarkModeProvider({children})
{
    const[isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

    useEffect(function(){
        if(isDarkMode)
        {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        }
        else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    function toggleDarkMode()
    {
        setIsDarkMode((isDark) => !isDark);
    }

    return <DarkModeChanger.Provider value={{isDarkMode, toggleDarkMode}}>
        {children}
    </DarkModeChanger.Provider>


}

function useDarkMode()
{
    const context = useContext(DarkModeChanger);
    if(context === undefined)
    {
        throw new Error("DarkModeContext is used outside the Provider");
    }

    return context;
}

export {DarkModeProvider, useDarkMode};


DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is a valid React node
  };