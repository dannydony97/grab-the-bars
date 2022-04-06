import React from "react";
import { Appearance } from "react-native";
import { ThemeManager } from "react-native-ui-lib";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";

const ThemeContext = React.createContext(null);

const ThemeProvider = ({children}) => {

  const [theme, setTheme] = React.useState(Appearance.getColorScheme());

  React.useEffect(() => {
    Appearance.addChangeListener((preferences) => {
      setTheme(preferences.colorScheme);
    });
  }, []);
  
  React.useEffect(() => {
    if(theme === null || theme === undefined) {
      console.error("Undefined theme!");
      return;
    }

    switch(theme) {
      case "light": setLightTheme(); break;
      case "dark": setDarkTheme(); break;
      default: console.error("New theme? Update switch!"); break;
    }
  }, [theme]);

  const setLightTheme = () => {

  }

  const setDarkTheme = () => {

  }

  return (
    <ThemeContext.Provider
      value={{}}
    >
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  if(theme === null)
    throw new Error("useTheme() called outside ThemeProvider?");

  return theme;
}

export { ThemeProvider, useTheme };