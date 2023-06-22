import settingsEnglish from "./english";
import settingsTurkish from "./turkish";

const CURRENT_LANGUAGE = process.env.REACT_APP_CURRENT_LANGUAGE;
/**
 * settings use for manage different languages data
 */
const settings = {
    en: settingsEnglish,
    tr: settingsTurkish
}

export default settings[CURRENT_LANGUAGE];