import { Heart, Users, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const CarCard = ({
  id,
  name,
  brand,
  type,
  image,
  pricePerDay,
  seats,
  transmission
}) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const carData = { id, name, brand, type, image, pricePerDay, seats, transmission };
  const favorited = isFavorite(id);

  const handleCardClick = () => {
    navigate(`/car/${id}`, {
      state: { car: carData }
    });
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate("/booking", {
      state: { car: carData }
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="glass-panel card-hover group relative rounded-3xl overflow-hidden flex flex-col h-full"
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(carData);
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-slate-300 dark:border-white/10 hover:bg-white/80 dark:hover:bg-black/40 transition-colors duration-300"
      >
        <Heart
          size={20}
          className={`transition-colors duration-300 ${
            favorited
              ? "text-red-500 fill-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
              : "text-slate-500 dark:text-white"
          }`}
        />
      </button>

      {/* Image Container */}
      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-slate-900/80 via-transparent to-transparent z-0"></div>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <span className="px-3 py-1 text-xs font-medium text-slate-800 dark:text-white bg-white/60 dark:bg-white/20 backdrop-blur-md rounded-full border border-slate-300 dark:border-white/20">
            {type}
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 backdrop-blur-md rounded-full border border-blue-200 dark:border-blue-500/30">
            {brand}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{name}</h3>
        </div>
        
        <div className="flex items-end gap-1 mb-6">
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            ${pricePerDay}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-sm mb-1">/day</span>
        </div>

        <div className="flex justify-between items-center mt-auto pb-6 border-b border-slate-200 dark:border-white/10">
          <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
            <Users size={18} className="text-blue-600 dark:text-blue-400" /> 
            <span className="text-sm font-medium">{seats} Seats</span>
          </span>
          <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
            <Settings2 size={18} className="text-purple-600 dark:text-purple-400" /> 
            <span className="text-sm font-medium">{transmission}</span>
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBookNow}
          className="w-full mt-6 py-3 rounded-xl btn-glow"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;