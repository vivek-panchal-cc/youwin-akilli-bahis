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
    return `A +${line}`;
  } else if (oddName === "over") {
    return `U -${line}`;
  } else {
    return "";
  }
};
