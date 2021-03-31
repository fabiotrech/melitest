const apiUrl = process.env.REACT_APP_API_URL;

export const searchTerm = async (term) => {
  return await fetch(`${apiUrl}/items?q=${term}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });
};

export const getById = async (id) => {
  return await fetch(`${apiUrl}/items/${id}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });
};
