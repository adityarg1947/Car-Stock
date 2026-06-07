import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  ChevronLeft,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Users,
  Settings2
} from 'lucide-react';

const BookingPage = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const car = location.state?.car;

  const [pickupDate, setPickupDate] = useState('');

  const [dropDate, setDropDate] = useState('');

  const [loading, setLoading] = useState(false);

  // Protect Route
  if (!car) {

    return <Navigate to="/explore" replace />;

  }

  // Calculate Days
  const calculateDays = () => {

    if (!pickupDate || !dropDate) return 0;

    const start = new Date(pickupDate);

    const end = new Date(dropDate);

    if (end < start) return 0;

    const diffTime = Math.abs(end - start);

    const diffDays = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    return diffDays === 0 ? 1 : diffDays;

  };

  const days = calculateDays();

  const subtotal = days * car.pricePerDay;

  const taxes = subtotal * 0.1;

  const total = subtotal + taxes;

  // SAVE BOOKING TO BACKEND
  const handleContinue = async () => {

    try {

      setLoading(true);

      // CURRENT USER
      const user = JSON.parse(localStorage.getItem("user"));

      // BOOKING DATA
      const bookingData = {

        userEmail: user.email,

        customerName: user.name,

        carName: car.name,

        image: car.image,

        pickupDate,

        returnDate: dropDate,

        totalPrice: total,

        status: "Upcoming"

      };

      const response = await fetch(
        "http://localhost:8080/api/bookings",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(bookingData)

        }
      );

      if (!response.ok) {

        throw new Error("Booking failed");

      }

      const savedBooking = await response.json();

      console.log("Booking Saved:", savedBooking);

      navigate('/payment', {
        state: {
          car,
          bookingDetails: {
            days,
            subtotal,
            taxes,
            total
          },
          booking: savedBooking
        }
      });

    } catch (error) {

      console.error("Booking Error:", error);

      alert("Booking failed. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  // Today's Date
  const today = new Date().toISOString().split('T')[0];

  const minDropDate = pickupDate || today;

  return (

    <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 pb-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group mb-8"
      >

        <div className="p-2 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 group-hover:bg-slate-300 dark:group-hover:bg-white/10 transition-colors">

          <ChevronLeft size={20} />

        </div>

        <span className="font-medium">
          Back to vehicle details
        </span>

      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

              Complete your booking

            </h1>

            <p className="text-slate-500 dark:text-slate-400">

              Review your vehicle and select dates.

            </p>

          </div>

          {/* CAR DETAILS */}
          <div className="glass-panel rounded-3xl overflow-hidden mt-2 group">

            <div className="h-64 overflow-hidden relative">

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-0"></div>

              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />

              <div className="absolute bottom-4 left-4 z-10 flex gap-2">

                <span className="px-3 py-1 text-xs font-medium text-slate-800 dark:text-white bg-white/60 dark:bg-white/20 backdrop-blur-md rounded-full border border-slate-300 dark:border-white/20">

                  {car.type}

                </span>

                <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 backdrop-blur-md rounded-full border border-blue-200 dark:border-blue-500/30">

                  {car.brand}

                </span>

              </div>

            </div>

            <div className="p-8">

              <div className="flex justify-between items-start mb-6">

                <div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">

                    {car.name}

                  </h3>

                  <div className="flex gap-4 text-slate-500 dark:text-slate-400 text-sm">

                    <span className="flex items-center gap-1.5">

                      <Users size={16} />

                      {car.seats} Seats

                    </span>

                    <span className="flex items-center gap-1.5">

                      <Settings2 size={16} />

                      {car.transmission}

                    </span>

                  </div>

                </div>

                <div className="text-right">

                  <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">

                    ${car.pricePerDay}

                  </span>

                  <p className="text-slate-400 text-sm">

                    /day

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col">

          <div className="glass-panel p-8 rounded-3xl sticky top-6">

            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">

              <Calendar className="text-blue-600 dark:text-blue-400" />

              Booking Details

            </h2>

            <div className="space-y-6">

              {/* DATE INPUTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* PICKUP DATE */}
                <div>

                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">

                    Pickup Date

                  </label>

                  <input
                    type="date"
                    min={today}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-200 rounded-xl px-4 py-3"
                  />

                </div>

                {/* RETURN DATE */}
                <div>

                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">

                    Return Date

                  </label>

                  <input
                    type="date"
                    min={minDropDate}
                    value={dropDate}
                    onChange={(e) => setDropDate(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-200 rounded-xl px-4 py-3"
                  />

                </div>

              </div>

              {/* TOTAL */}
              {days > 0 && (

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">

                  <div className="flex justify-between items-end mb-8">

                    <span className="text-slate-600 dark:text-slate-300 font-medium">

                      Total Amount

                    </span>

                    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">

                      ${total.toFixed(2)}

                    </span>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={handleContinue}
                    disabled={loading || days === 0}
                    className="w-full py-4 rounded-xl flex items-center justify-center gap-2 btn-glow disabled:opacity-50 disabled:cursor-not-allowed group"
                  >

                    {loading
                      ? "Processing..."
                      : "Continue to Payment"}

                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />

                  </button>

                  {/* SECURITY TEXT */}
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">

                    <ShieldCheck
                      size={14}
                      className="text-green-400"
                    />

                    <span>
                      Free cancellation up to 48 hours before pickup
                    </span>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default BookingPage;