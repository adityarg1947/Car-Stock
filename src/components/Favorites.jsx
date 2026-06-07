import { useFavorites } from '../context/FavoritesContext';
import CarCard from './CarCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
          <p className="text-slate-400">Explore cars and click the heart icon to save them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
