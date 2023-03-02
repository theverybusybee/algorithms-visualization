export const setDelayForAnimation = (timeForDelay = 0) => {
  return new Promise((resolve) => setTimeout(resolve, timeForDelay));
};
