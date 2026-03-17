export const constantsToOptions = <T extends Record<string, string>>(obj: T) => {
  return Object.values(obj).map((value) => ({
    label: value,
    value,
  }));
};