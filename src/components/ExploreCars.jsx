import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./CarCard";

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeType, setActiveType] = useState("All");

  // Fetch cars from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cars")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  // Dynamic brands/types
  const brands = ["All", ...new Set(cars.map((car) => car.brand))];
  const types = ["All", ...new Set(cars.map((car) => car.type))];

  // Filter cars
  const filteredCars = cars.filter((car) => {
    return (
      (activeBrand === "All" || car.brand === activeBrand) &&
      (activeType === "All" || car.type === activeType)
    );
  });

  return (
    <div className="flex flex-col gap-8 pb-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Explore Cars
        </h1>
      </div>

      <div className="glass-panel p-6 rounded-3xl flex flex-col gap-6">

        {/* Brand Filters */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Brands
          </h3>

          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeBrand === brand
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filters */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Car Type
          </h3>

          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeType === type
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCars.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl text-center">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No cars found matching your criteria
          </p>

          <button
            onClick={() => {
              setActiveBrand("All");
              setActiveType("All");
            }}
            className="mt-4 text-blue-600 dark:text-blue-400"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreCars;