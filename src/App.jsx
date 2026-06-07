import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./components/Dashboard";
import ExploreCars from "./components/ExploreCars";
import CarDetails from "./components/CarDetails";
import BookingPage from "./components/BookingPage";
import PaymentPage from "./components/PaymentPage";
import MyBookings from "./components/MyBookings";
import ReturnCar from "./components/ReturnCar";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";
import Payments from "./components/Payments";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { FavoritesProvider } from "./context/FavoritesContext";

function App() {

  return (

    <FavoritesProvider>

      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* PROTECTED WEBSITE ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route path="/" element={<Dashboard />} />

          <Route path="/explore" element={<ExploreCars />} />

          <Route path="/car/:id" element={<CarDetails />} />

          <Route path="/booking" element={<BookingPage />} />

          <Route path="/payment" element={<PaymentPage />} />

          <Route path="/bookings" element={<MyBookings />} />

          {/* PAYMENTS PAGE */}
          <Route path="/payments" element={<Payments />} />

          <Route path="/return" element={<ReturnCar />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/favorites" element={<Favorites />} />

        </Route>

      </Routes>

    </FavoritesProvider>

  );

}

export default App;