import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  ChevronLeft,
  CreditCard,
  Lock,
  Smartphone,
  ShieldCheck
} from 'lucide-react';

const PaymentPage = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const car = location.state?.car;

  const bookingDetails = location.state?.bookingDetails;

  const [paymentMethod, setPaymentMethod] = useState('card');

  const [isProcessing, setIsProcessing] = useState(false);

  // PROTECT ROUTE
  if (!car || !bookingDetails) {

    return <Navigate to="/explore" replace />;

  }

  // HANDLE PAYMENT
  const handlePayment = async () => {

    try {

      setIsProcessing(true);

      // CURRENT USER
      const user = JSON.parse(localStorage.getItem("user"));

      // PAYMENT DATA
      const paymentData = {

        userEmail: user.email,

        carName: car.name,

        amount: bookingDetails?.total || 0,

        paymentMethod: paymentMethod,

        paymentDate: new Date().toLocaleDateString()

      };

      const response = await fetch(
        "http://localhost:8080/api/payments",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(paymentData)

        }
      );

      if (!response.ok) {

        throw new Error("Failed to save payment");

      }

      await response.json();

      alert("Payment Successful!");

      // GO TO PAYMENTS HISTORY
      navigate("/payments");

    } catch (error) {

      console.error(error);

      alert("Payment failed");

    } finally {

      setIsProcessing(false);

    }

  };

  return (

    <div className="animate-in fade-in duration-500 pb-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group mb-8"
      >

        <div className="p-2 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 group-hover:bg-slate-300 dark:group-hover:bg-white/10 transition-colors">

          <ChevronLeft size={20} />

        </div>

        <span className="font-medium">
          Back to booking
        </span>

      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

            Payment Method

          </h1>

          <div className="glass-panel p-8 rounded-3xl">

            {/* PAYMENT OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

              {/* CARD */}
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                  paymentMethod === 'card'
                    ? 'bg-blue-100 dark:bg-blue-600/20 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'
                }`}
              >

                <CreditCard size={28} />

                <span className="font-medium">
                  Credit Card
                </span>

              </button>

              {/* PAYPAL */}
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                  paymentMethod === 'paypal'
                    ? 'bg-blue-100 dark:bg-blue-600/20 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'
                }`}
              >

                <Smartphone size={28} />

                <span className="font-medium">
                  PayPal
                </span>

              </button>

              {/* GOOGLE PAY */}
              <button
                onClick={() => setPaymentMethod('googlepay')}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                  paymentMethod === 'googlepay'
                    ? 'bg-blue-100 dark:bg-blue-600/20 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'
                }`}
              >

                <Smartphone size={28} />

                <span className="font-medium">
                  Google Pay
                </span>

              </button>

            </div>

            {/* CARD FORM */}
            {paymentMethod === 'card' && (

              <div className="space-y-6">

                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3"
                />

                <div className="grid grid-cols-2 gap-6">

                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3"
                  />

                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3"
                  />

                </div>

              </div>

            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">

          <div className="glass-panel p-8 rounded-3xl sticky top-6">

            <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">

              Order Total

            </h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-white/10 text-sm">

              <div className="flex justify-between">

                <span>
                  {car.name} ({bookingDetails?.days || 0} days)
                </span>

                <span>
                  ${Number(bookingDetails?.subtotal || 0).toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Taxes & Fees
                </span>

                <span>
                  ${Number(bookingDetails?.taxes || 0).toFixed(2)}
                </span>

              </div>

            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-end mb-8">

              <span>
                Amount to Pay
              </span>

              <span className="text-4xl font-bold">

                ${Number(bookingDetails?.total || 0).toFixed(2)}

              </span>

            </div>

            {/* PAYMENT BUTTON */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl flex items-center justify-center gap-2 btn-glow disabled:opacity-50"
            >

              {isProcessing ? (

                "Processing..."

              ) : (

                <>
                  <Lock size={20} />

                  Pay ${Number(bookingDetails?.total || 0).toFixed(2)}
                </>

              )}

            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">

              <ShieldCheck size={14} className="text-green-400" />

              <span>
                Payments are secure and encrypted
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default PaymentPage;0