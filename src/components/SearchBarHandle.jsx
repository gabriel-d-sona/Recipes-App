const SearchBarHandle = async (renderSearch, history) => {
  try {
    // console.log('cheguei aqui 1');
    const results = await renderSearch();
    // console.log('cheguei aqui 2');
    // console.log(results);
    const path = history.location.pathname;

    if (!results) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      // console.log('cheguei aqui 3');
    }

    if (results.length === 1) {
      // console.log('cheguei aqui 4');
      if (path.includes('/meals')) {
        history.push(`/meals/${results[0].idMeal}`);
      }
      if (path.includes('/drinks')) {
        // console.log('cheguei aqui 5');
        history.push(`/drinks/${results[0].idDrink}`);
      }
    }
  } catch (error) {
    console.error('An error occurred in SearchBarHandle:', error);
  }
};

export default SearchBarHandle;
