import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, Check, AlertTriangle, Info, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const ReturnCar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [checklist, setChecklist] = useState({
    fuel: false,
    damage: false,
    cleanliness: false,
    keys: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!booking) {
    return <Navigate to="/bookings" replace />;
  }

  const isAllChecked = Object.values(checklist).every(Boolean);

  const handleToggle = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Car Returned Successfully!');
      navigate('/bookings');
    }, 2000);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group mb-8"
      >
        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
          <ChevronLeft size={20} />
        </div>
        <span className="font-medium">Back to bookings</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Return Process */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Return Vehicle</h1>
            <p className="text-slate-400">Please complete the checklist before handing over the keys.</p>
          </div>
          
          {/* Instructions */}
          <div className="glass-panel p-6 rounded-3xl bg-blue-500/5 border-blue-500/20 flex items-start gap-4">
            <Info className="text-blue-400 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-blue-100 mb-1">Return Instructions</h3>
              <p className="text-sm text-slate-300">
                Park the vehicle in any designated return spot. Ensure all personal belongings are removed. 
                Complete this checklist to verify the vehicle's condition, then leave the keys in the drop-box.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="glass-panel p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6">Condition Checklist</h2>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-200">Fuel Level</h4>
                  <p className="text-sm text-slate-400">Tank is at or above the level it was during pickup</p>
                </div>
                <div 
                  onClick={() => handleToggle('fuel')}
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    checklist.fuel ? 'bg-blue-500 text-white' : 'border-2 border-slate-500'
                  }`}
                >
                  {checklist.fuel && <Check size={16} />}
                </div>
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-200">No New Damage</h4>
                  <p className="text-sm text-slate-400">No scratches, dents, or interior damage occurred</p>
                </div>
                <div 
                  onClick={() => handleToggle('damage')}
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    checklist.damage ? 'bg-blue-500 text-white' : 'border-2 border-slate-500'
                  }`}
                >
                  {checklist.damage && <Check size={16} />}
                </div>
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-200">Cleanliness</h4>
                  <p className="text-sm text-slate-400">Vehicle is reasonably clean, no trash left behind</p>
                </div>
                <div 
                  onClick={() => handleToggle('cleanliness')}
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    checklist.cleanliness ? 'bg-blue-500 text-white' : 'border-2 border-slate-500'
                  }`}
                >
                  {checklist.cleanliness && <Check size={16} />}
                </div>
              </label>

              <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-200">Keys & Accessories</h4>
                  <p className="text-sm text-slate-400">Keys and all original accessories are present</p>
                </div>
                <div 
                  onClick={() => handleToggle('keys')}
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    checklist.keys ? 'bg-blue-500 text-white' : 'border-2 border-slate-500'
                  }`}
                >
                  {checklist.keys && <Check size={16} />}
                </div>
              </label>
            </div>
            
            {!isAllChecked && (
              <div className="flex items-center gap-2 mt-6 text-sm text-amber-400">
                <AlertTriangle size={16} />
                <span>Please complete all checklist items before confirming the return.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Rental Summary */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-8 rounded-3xl sticky top-6">
            <h2 className="text-xl font-bold mb-6">Rental Summary</h2>
            
            {/* Car Snippet */}
            <div className="flex flex-col items-center mb-6 pb-6 border-b border-white/10">
              <div className="w-40 h-24 mb-4 relative">
                <img src={booking?.carImage} alt={booking?.carName} className="w-full h-full object-contain drop-shadow-xl" />
              </div>
              <h3 className="font-bold text-xl">{booking?.carName}</h3>
              <p className="text-slate-400 text-sm font-mono mt-1">ID: {booking?.id}</p>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Calendar className="text-slate-400 mt-0.5" size={18} />
                <div>
                  <p className="text-xs text-slate-500">Rental Period</p>
                  <p className="text-sm font-medium">{booking?.pickupDate} — {booking?.dropDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-slate-400 mt-0.5" size={18} />
                <div>
                  <p className="text-xs text-slate-500">Return Location</p>
                  <p className="text-sm font-medium">{booking?.location}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleConfirm}
              disabled={!isAllChecked || isProcessing}
              className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] transition-all duration-300"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Return...
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Confirm Return
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReturnCar;
