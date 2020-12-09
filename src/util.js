const makeTimeUnitDisplayable = (unit) => {
  return unit > 9 ? String(unit) : `0${unit}`;
};

export const convertRawTime = (rawSeconds) => {
  const minutes = Math.floor(rawSeconds / 60);
  const seconds = rawSeconds - (minutes * 60);
  const displayableMinutes = makeTimeUnitDisplayable(minutes);
  const displayableSeconds = makeTimeUnitDisplayable(seconds);
  return `${displayableMinutes}:${displayableSeconds}`;
};
