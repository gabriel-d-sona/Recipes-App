export const getLocalStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};
