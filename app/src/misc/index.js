import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import settingsEnglish from "./english";
import settingsTurkish from "./turkish";

const CURRENT_LANGUAGE = process.env.REACT_APP_CURRENT_LANGUAGE;
/**
 * settings use for manage different languages data
 */
const lanSettings = {
  en: settingsEnglish,
  tr: settingsTurkish,
};

const useCurrentLanguage = () => {
  const { language } = useContext(AppContext);
  return lanSettings[language || CURRENT_LANGUAGE];
};
export default useCurrentLanguage;
