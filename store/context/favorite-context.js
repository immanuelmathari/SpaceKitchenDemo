import { createContext } from "react";

// this name should start with uppercase character
const FavoriteContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {},
});

function FavoritesContextProvider({}) {
    return <FavoriteContext.Provider>{children}</FavoriteContext.Provider>
}

export default FavoritesContextProvider;