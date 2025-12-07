
const FAVORITES_KEY = 'verve_favorites';

export const favoritesService = {
    getAll: () => {
        try {
            const favorites = localStorage.getItem(FAVORITES_KEY);

            if (favorites === '"[]"' || favorites === '[]') {
                localStorage.removeItem(FAVORITES_KEY);
                return [];
            }

            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error('Ошибка чтения избранного:', error);
            localStorage.removeItem(FAVORITES_KEY);
            return [];
        }
    },

    add: (establishmentId) => {
        const favorites = favoritesService.getAll();
        if (!favorites.includes(establishmentId)) {
            favorites.push(establishmentId);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
        return favorites;
    },

    remove: (establishmentId) => {
        let favorites = favoritesService.getAll();
        favorites = favorites.filter(id => id !== establishmentId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return favorites;
    },

    isFavorite: (establishmentId) => {
        const favorites = favoritesService.getAll();
        return favorites.includes(establishmentId);
    },

    clear: () => {
        localStorage.removeItem(FAVORITES_KEY);
    }
};