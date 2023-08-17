import axios from "axios";

const url = process.env.REACT_APP_YOUWIN_API;

// function use for odd button status return
export const getCurrentOddStatus = (title, line) => {
  const oddName = title?.toLowerCase();
  if (oddName === "home") {
    return "1";
  } else if (oddName === "away") {
    return "2";
  } else if (oddName === "draw") {
    return "X";
  } else if (oddName === "under") {
    return `A ${line ? "+" + line : ""}`;
  } else if (oddName === "over") {
    return `U ${line ? "-" + line : ""}`;
  } else {
    return "";
  }
};

export const getNameValue = (name_en, settings) => {
  const marketName = name_en?.toLowerCase();
  switch (marketName) {
    case "home":
      return settings.marketNames.home;
    case "away":
      return settings.marketNames.away;
    case "draw":
      return settings.marketNames.draw;
    default:
      return null; // Or return undefined or another distinguishable value.
  }
};

export const multiBetAPI = async (stake, win) => {
  try {
    const apiUrl = `${url}/getmymultibetsjson?stake=${stake}&win=${win}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("Internal Server Error", error.message);
  }
};

export const multiBetAlterSuggestionAPI = async (eventIds, multiGroupIds) => {
  try {
    const apiUrl = `${url}/GetReplaceBet?ExcludeMatches=${eventIds}&MultiGroupId=${multiGroupIds}&lang=en`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("Internal Server Error", error.message);
  }
};
