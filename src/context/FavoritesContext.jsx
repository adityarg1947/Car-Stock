import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (car) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.id === car.id);
      if (isFavorited) {
        return prevFavorites.filter((fav) => fav.id !== car.id);
      } else {
        return [...prevFavorites, car];
      }
    });
  };

  const isFavorite = (carId) => favorites.some((fav) => fav.id === carId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
