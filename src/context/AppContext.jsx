import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);

  return (
    <AppContext.Provider
      value={{
        selectedCar,
        setSelectedCar,
        favorites,
        setFavorites,
        bookings,
        setBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};