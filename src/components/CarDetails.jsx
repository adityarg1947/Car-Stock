import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CarDetails = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const car = location.state?.car;

  const [isFavorite, setIsFavorite] = useState(false);

  // ONLY selected car image
  const [activeImage, setActiveImage] = useState(car?.image || "");

  // SAFETY CHECK
  if (!car) {

    return (

      <div className="flex flex-col items-center justify-center py-20">

        <h2 className="text-xl font-bold mb-4">
          Car not found
        </h2>

        <button
          onClick={() => navigate("/explore")}
          className="bg-blue-600 px-6 py-2 rounded-lg text-white"
        >
          Go Back
        </button>

      </div>

    );

  }

  return (

    <div className="flex flex-col gap-6 pb-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-slate-700 dark:text-white"
      >
        ← Back
      </button>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div>

          {/* MAIN IMAGE */}
          <img
            src={activeImage}
            alt={car.name}
            className="w-full h-[400px] object-cover rounded-2xl"
          />

          {/* SINGLE THUMBNAIL */}
          <div className="flex gap-3 mt-4">

            <img
              src={car.image}
              alt={car.name}
              onClick={() => setActiveImage(car.image)}
              className="w-24 h-24 object-cover rounded-xl cursor-pointer border border-white/10"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {car.name}
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {car.brand}
          </p>

          <p className="text-3xl mt-6 text-slate-900 dark:text-white font-semibold">
            ${car.pricePerDay}/day
          </p>

          {/* SPECS */}
          <div className="flex gap-6 mt-6 text-slate-600 dark:text-slate-300">

            <span>
              {car.seats} seats
            </span>

            <span>
              {car.transmission}
            </span>

          </div>

          {/* FAVORITE */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="mt-6 text-2xl"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>

          {/* BOOK BUTTON */}
          <button
            onClick={() =>
              navigate("/booking", { state: { car } })
            }
            className="block mt-8 bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-xl transition-all"
          >
            Book Now
          </button>

        </div>

      </div>

    </div>

  );

};

export default CarDetails;