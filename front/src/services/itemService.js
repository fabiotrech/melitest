
export const search = async term => {
    return await fetch(`http://localhost:3100/api/items?q=${term}`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => {
            console.log(err);
        });
};

export const getById = async id => {
    return await fetch(`http://localhost:3100/api/items/${id}`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => {
            console.log(err);
        });
}
