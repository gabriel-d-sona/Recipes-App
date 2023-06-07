const filterArrays = (array, string) => {
  const data = Object.entries(array);

  const filteredArray = data.filter((item) => item[0].includes(string));
  const treatedArray = filteredArray.filter((item) => item[1] !== '' && item[1] !== null);

  return Object.values(treatedArray);
};

export default filterArrays;
