export const getFavoriteUsers = () => {
    const favorites=localStorage.getItem('favoriteUsers');
    return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (username, address) => {
    const favorites = getFavoriteUsers();
    if (!favorites.some(user => user.address === address)) {
        favorites.push({ username, address });
        localStorage.setItem('favoriteUsers', JSON.stringify(favorites));
        return true;
    }
    return false;
};

export const removeFromFavorites = (address) => {
    const favorites = getFavoriteUsers();
    const filteredFavorites = favorites.filter(user => user.address !== address);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
};

export const isFavorite = (address) => {
    const favorites = getFavoriteUsers();
    return favorites.some(user => user.address === address);
};