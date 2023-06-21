import settingsEnglish from "./english";
import settingsTurkish from "./turkish";

const CURRENT_LANGUAGE = process.env.REACT_APP_CURRENT_LANGUAGE;

const settings = {
    en: settingsEnglish,
    tr: settingsTurkish
}

export default settings[CURRENT_LANGUAGE];