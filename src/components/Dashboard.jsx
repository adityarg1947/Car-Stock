import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { MOCK_CARS } from "../data/cars";
import { ArrowRight, Sparkles } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const featuredCars = MOCK_CARS.slice(0, 3);

  return (
    <div className="flex flex-col gap-10 pb-10">
      
      {/* Hero Section */}
      <section className="glass-panel p-10 rounded-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-600/20 dark:to-purple-600/20 z-0 transition-opacity duration-500 group-hover:opacity-75"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4 font-medium px-4 py-1.5 bg-blue-100/50 dark:bg-blue-500/10 w-fit rounded-full border border-blue-200 dark:border-blue-500/20">
            <Sparkles size={16} />
            <span>Premium Car Rental</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Find Your Perfect Drive Today
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-xl">
            Experience luxury and performance with our handpicked collection of premium vehicles. 
          </p>
          <button 
            onClick={() => navigate("/explore")}
            className="btn-glow px-8 py-4 rounded-xl flex items-center gap-2"
          >
            Explore Fleet <ArrowRight size={20} />
          </button>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden lg:block opacity-30 blur-2xl bg-blue-200 dark:bg-blue-400 rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
      </section>

      {/* Featured Cars Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Featured Cars</h2>
            <p className="text-slate-500 dark:text-slate-400">Our most popular premium vehicles</p>
          </div>
          <button 
            onClick={() => navigate("/explore")}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-2 hover:translate-x-1 transition-transform"
          >
            View All <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
