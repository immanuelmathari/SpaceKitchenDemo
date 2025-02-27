import { createContext, useState } from "react";

// this name should start with uppercase character
const FavoriteContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {},
});

function FavoritesContextProvider({}) {
    const [favoriteMealIds, setFavoriteMealIds] = useState();

    function addFavorite(id){
        // we spread our id our current ids and add the new one
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id])
    }

    function removeFavorite(id){
        // id is the meal to be removed from favorites
        setFavoriteMealIds((currentFavIds) => 
            // we filter the mealId that we receive. 
            // we check if mealId is not equal to Id its true and we keep it
            // if mealId is == to the id, it returns false and we filter it out
            currentFavIds.filter((mealId) => mealId !== id ));
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
    };

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}

export default FavoritesContextProvider;