import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

interface PaymentPlanProps {
  userData: any;
  onSuccess: () => void;
  onSkip?: () => void;
}

const PLANS = [
  {
    key: '3months',
    label: '3 Months',
    price: '₦6,000',
    priceNum: 6000,
    period: 'every 3 months',
    perMonth: '₦2,000/mo',
    features: ['Full platform access', 'All coding engines', 'Game center', 'Progress tracking'],
    color: 'from-indigo-500 to-indigo-700',
    glow: 'shadow-indigo-500/30',
    badge: null,
  },
  {
    key: '6months',
    label: '6 Months',
    price: '₦10,000',
    priceNum: 10000,
    period: 'every 6 months',
    perMonth: '₦1,667/mo',
    features: ['Full platform access', 'All coding engines', 'Game center', 'Progress tracking', 'Priority support'],
    color: 'from-violet-500 to-purple-700',
    glow: 'shadow-violet-500/30',
    badge: 'Most Popular',
  },
  {
    key: '1year',
    label: '1 Year',
    price: '₦16,000',
    priceNum: 16000,
    period: 'every year',
    perMonth: '₦1,333/mo',
    features: ['Full platform access', 'All coding engines', 'Game center', 'Progress tracking', 'Priority support', 'Best value'],
    color: 'from-cyan-500 to-teal-700',
    glow: 'shadow-cyan-500/30',
    badge: 'Best Value',
  },
];

const PaymentPlan: React.FC<PaymentPlanProps> = ({ userData, onSuccess, onSkip }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast.error('Please select a plan first');
      return;
    }

    setIsLoading(true);
    try {
      const isGuestCheckout = !userData?.id;
      const endpoint = isGuestCheckout ? '/api/payment/initialize-new' : '/api/payment/initialize';
      const token = localStorage.getItem('token');
      
      const payload: any = { plan: selectedPlan };
      if (isGuestCheckout) {
        payload.email = userData.email;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isGuestCheckout ? {} : { 'x-auth-token': token || '' }),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.authorization_url) {
        // Redirect to Paystack checkout
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.message || 'Failed to initialize payment');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Could not connect to payment server');
    } finally {
      setIsLoading(false);
    }
  };

  const planObj = PLANS.find(p => p.key === selectedPlan);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Background decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] -mr-80 -mt-80" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] -ml-80 -mb-80" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-5xl relative animate-in fade-in zoom-in-95 duration-500">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/30">
            <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">
            Choose Your Plan
          </h1>
          <p className="text-slate-400 font-medium text-lg">
            Welcome, <span className="text-white font-bold">{userData?.fullName || 'Learner'}</span>! Pick a plan to unlock the full FutureLab experience.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Auto-renews • Cancel anytime</span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PLANS.map((plan, i) => {
            const isSelected = selectedPlan === plan.key;
            return (
              <div
                key={plan.key}
                onClick={() => setSelectedPlan(plan.key)}
                className={`relative rounded-3xl border cursor-pointer transition-all duration-300 overflow-hidden group
                  ${isSelected
                    ? `border-transparent ring-2 ring-offset-2 ring-offset-slate-900 ${plan.key === '3months' ? 'ring-indigo-500' : plan.key === '6months' ? 'ring-violet-500' : 'ring-cyan-500'} shadow-2xl ${plan.glow} scale-[1.02]`
                    : 'border-slate-700 hover:border-slate-600 hover:scale-[1.01]'
                  }`}
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.color} ${isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'} transition-opacity`} />
                
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${plan.color} rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg`}>
                    {plan.badge}
                  </div>
                )}

                <div className={`p-7 ${isSelected ? 'bg-slate-800/80' : 'bg-slate-800/40 group-hover:bg-slate-800/60'} transition-colors`}>
                  {/* Plan Name */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r ${plan.color} bg-opacity-10 mb-4`}>
                    <span className={`text-xs font-black uppercase tracking-widest bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {plan.label}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium mb-1">{plan.period}</p>
                  <p className={`text-sm font-black mb-6 bg-gradient-to-r ${plan.color} bg-clip-text`}
                    style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {plan.perMonth}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300 font-medium">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}>
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className={`mt-5 flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-gradient-to-r ${plan.color} bg-clip-text`}
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${plan.color}`} />
                      Selected
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSubscribe}
            disabled={!selectedPlan || isLoading}
            className={`w-full max-w-md py-5 font-black rounded-2xl text-lg transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl
              ${!selectedPlan
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : planObj?.key === '3months'
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white shadow-indigo-500/30'
                  : planObj?.key === '6months'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-700 hover:from-violet-400 hover:to-purple-600 text-white shadow-violet-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-teal-700 hover:from-cyan-400 hover:to-teal-600 text-white shadow-cyan-500/30'
              }`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {selectedPlan ? `Subscribe — ${planObj?.price}` : 'Select a Plan'}
              </>
            )}
          </button>

          <p className="text-slate-500 text-xs font-medium text-center">
            🔒 Secured by <span className="text-white font-bold">Paystack</span> · Auto-renews · Cancel anytime from settings
          </p>

          {onSkip && (
            <button
              onClick={onSkip}
              className="text-slate-600 hover:text-slate-400 text-sm font-medium transition-colors mt-1 underline underline-offset-4"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
