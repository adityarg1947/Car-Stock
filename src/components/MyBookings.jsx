import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Filter
} from "lucide-react";

const getStatusColor = (status) => {

  switch (status) {

    case "Ongoing":
      return "bg-emerald-500/20 text-emerald-400";

    case "Upcoming":
      return "bg-blue-500/20 text-blue-400";

    case "Completed":
      return "bg-slate-500/20 text-slate-400";

    case "Cancelled":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-slate-500/20 text-slate-400";

  }

};

const MyBookings = () => {

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");

  const tabs = [
    "All",
    "Ongoing",
    "Upcoming",
    "Completed",
    "Cancelled"
  ];

  // FETCH CURRENT USER BOOKINGS
  const fetchBookings = async () => {

    try {

      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        `http://localhost:8080/api/bookings/user/${user.email}`
      );

      if (!response.ok) {

        throw new Error("Failed to fetch bookings");

      }

      const data = await response.json();

      setBookings(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchBookings();

  }, []);

  // FILTER BOOKINGS
  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === filter
        );

  return (

    <div className="flex flex-col gap-8 pb-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

          My Bookings

        </h1>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search..."
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-transparent text-slate-900 dark:text-white px-4 py-2 rounded-lg"
          />

          <button className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white rounded-lg">

            <Filter size={18} />

          </button>

        </div>

      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 flex-wrap">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === tab
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-gray-300"
            }`}
          >

            {tab}

          </button>

        ))}

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-center text-gray-400 mt-20">

          Loading bookings...

        </div>

      ) : (

        <div className="flex flex-col gap-4">

          {filteredBookings.length > 0 ? (

            filteredBookings.map((booking) => (

              <div
                key={booking.id}
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent p-5 rounded-xl flex flex-col md:flex-row gap-6 shadow-sm"
              >

                {/* IMAGE */}
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">

                  <img
                    src={
                      booking.image ||
                      "https://via.placeholder.com/400"
                    }
                    alt={booking.carName}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* INFO */}
                <div className="flex-1">

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">

                    {booking.carName}

                  </h3>

                  <p className="text-sm text-slate-500 dark:text-gray-400">

                    Booking #{booking.id}

                  </p>

                  <div className="flex flex-col gap-2 mt-2 text-sm text-slate-600 dark:text-slate-300">

                    <div className="flex items-center gap-2">

                      <Calendar size={16} />

                      {booking.pickupDate} → {booking.returnDate}

                    </div>

                    <div className="flex items-center gap-2">

                      <MapPin size={16} />

                      {booking.location || "Car Rental Office"}

                    </div>

                  </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-end justify-between">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                      booking.status || "Upcoming"
                    )}`}
                  >

                    {booking.status || "Upcoming"}

                  </span>

                  <p className="text-xl font-bold mt-2 text-slate-900 dark:text-white">

                    ${Number(booking.totalPrice || 0).toFixed(2)}

                  </p>

                  <button
                    className="mt-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >

                    View Details

                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center mt-20 text-gray-400">

              No bookings found

            </div>

          )}

        </div>

      )}

    </div>

  );

};

export default MyBookings;