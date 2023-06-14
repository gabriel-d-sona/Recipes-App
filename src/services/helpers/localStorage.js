export const getLocalStorage = (string) => {
  const data = localStorage.getItem(string);
  return JSON.parse(data);
};
