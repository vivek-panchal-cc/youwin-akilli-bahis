import axios from "axios";

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

export const multiBetAPI = async (stake, win) => {
  try {
    const apiUrl = `https://youwin2.bettorlogic.com/accaattack/youwinservice.svc/getmymultibetsjson?stake=${stake}&win=${win}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("Internal Server Error", error.message);
  }
};

export const multiBetAlterSuggestionAPI = async (eventIds, groupId) => {
  try {
    const apiUrl = `https://youwin2.bettorlogic.com/accaattack/youwinservice.svc/GetReplaceBet?ExcludeMatches=${eventIds}&MultiGroupId=${groupId}&lang=en`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("Internal Server Error", error.message);
  }
};
