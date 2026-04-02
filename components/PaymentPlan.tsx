import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../App';

interface PaymentPlanProps {
  userData: any;
  paymentContext?: 'signup' | 'trainer';
  onSuccess: () => void;
  onSkip?: () => void;
}

const PLANS = [
  {
    key: '3months',
    label: '3 Months',
    price: '₦20,000',
    priceNum: 20000,
    period: 'every 3 months',
    perMonth: '₦6,667/mo',
    features: ['Full platform access', 'All coding engines', 'Game center', 'Progress tracking'],
    color: 'from-indigo-500 to-indigo-700',
    glow: 'shadow-indigo-500/30',
    badge: null,
  },
  {
    key: '6months',
    label: '6 Months',
    price: '₦35,000',
    priceNum: 35000,
    period: 'every 6 months',
    perMonth: '₦5,833/mo',
    features: ['Full platform access', 'All coding engines', 'Game center', 'Progress tracking', 'Priority support'],
    color: 'from-violet-500 to-purple-700',
    glow: 'shadow-violet-500/30',
    badge: 'Most Popular',
  },
  {
    key: '1year',
    label: '1 Year',
    price: '₦60,000',
    priceNum: 60000,
    period: 'every year',
    perMonth: '₦5,000/mo',
    features: ['Full platform access', 'All coding engines', 'Game center', 'Progress tracking', 'Priority support', 'Best value'],
    color: 'from-cyan-500 to-teal-700',
    glow: 'shadow-cyan-500/30',
    badge: 'Best Value',
  },
];

const TRAINER_FEATURES = [
  'Twice a week engagement',
  '5 hours a week',
  'Full platform access',
  'All coding engines',
  'Game center',
  'Progress tracking',
  'Priority support',
  'Best value'
];

const PaymentPlan: React.FC<PaymentPlanProps> = ({ userData, paymentContext = 'signup', onSuccess, onSkip }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [instructor, setInstructor] = useState<{ id: string, fullName: string, rate: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selectedInstructor');
    if (saved) {
      try {
        setInstructor(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse instructor');
      }
    }
  }, []);

  const calculateTotal = (planKey: string) => {
    const plan = PLANS.find(p => p.key === planKey);
    if (!plan) return 0;
    
    let total = 0;
    if (paymentContext === 'signup') {
      total += plan.priceNum;
    }

    if (instructor) {
      const months = planKey === '3months' ? 3 : planKey === '6months' ? 6 : 12;
      total += ((Number(instructor.rate) || 20000) * months);
    } else if (paymentContext === 'signup') {
      total = plan.priceNum;
    }
    return total;
  };

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
      
      const payload: any = { 
        plan: selectedPlan,
        instructorId: instructor?.id,
        amount: calculateTotal(selectedPlan)
      };
      
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
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.message || 'Failed to initialize payment');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Could not connect to payment server');
      setIsLoading(false);
    }
  };

  const planObj = PLANS.find(p => p.key === selectedPlan);
  const totalAmount = selectedPlan ? calculateTotal(selectedPlan) : 0;

  return (
    <div className="fixed inset-0 bg-slate-900 overflow-y-auto overflow-x-hidden font-inter z-[100] selection:bg-indigo-500/30">
      <div className="flex flex-col items-center p-6 md:pt-12 md:pb-6 relative ">
        {/* Background decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-cyan-600/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="w-full max-w-5xl relative animate-in fade-in zoom-in-95 duration-500">
          {/* Header */}
          <div className="text-center mb-12">
            {onSkip && (
              <button 
                onClick={onSkip}
                className="absolute -top-4 -right-4 w-12 h-12 bg-slate-800 border border-slate-700/50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/30">
              <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-3">
              {instructor ? `Assign ${instructor.fullName}` : 'Choose Your Plan'}
            </h1>
            <p className="text-slate-400 font-medium text-lg">
              {instructor 
                ? `Select a subscription period to finalize assigning ${instructor.fullName} to your child.`
                : `Welcome, ${userData?.fullName || 'Learner'}! Pick a plan to unlock the full FutureLab experience.`
              }
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
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.color} ${isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'} transition-opacity`} />
                  
                  {plan.badge && (
                    <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${plan.color} rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className={`p-7 ${isSelected ? 'bg-slate-800/80' : 'bg-slate-800/40 group-hover:bg-slate-800/60'} transition-colors`}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r ${plan.color} bg-opacity-10 mb-4`}>
                      <span className={`text-xs font-black uppercase tracking-widest bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {plan.label}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="text-4xl font-black text-white">₦{calculateTotal(plan.key).toLocaleString()}</span>
                      {instructor && (
                        <div className="mt-1 flex flex-col">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {paymentContext === 'signup' 
                              ? `₦${plan.priceNum.toLocaleString()} (Platform) + ₦${((Number(instructor.rate) || 20000) * (plan.key === '3months' ? 3 : plan.key === '6months' ? 6 : 12)).toLocaleString()} (Trainer)`
                              : `₦${((Number(instructor.rate) || 20000) * (plan.key === '3months' ? 3 : plan.key === '6months' ? 6 : 12)).toLocaleString()} (Trainer Fee Only)`
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{plan.period}</p>
                    <p className={`text-sm font-black mb-6 bg-gradient-to-r ${plan.color} bg-clip-text`}
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {instructor 
                        ? `₦${(calculateTotal(plan.key) / (plan.key === '3months' ? 3 : plan.key === '6months' ? 6 : 12)).toLocaleString().split('.')[0]}/mo total`
                        : plan.perMonth
                      }
                    </p>

                    <ul className="space-y-2.5">
                      {(paymentContext === 'trainer' ? TRAINER_FEATURES : plan.features).map((f) => (
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
                  {selectedPlan ? `Subscribe — ₦${totalAmount.toLocaleString()}` : 'Select a Plan'}
                </>
              )}
            </button>

            {instructor && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 w-full max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Selected Trainer</span>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('selectedInstructor');
                      setInstructor(null);
                    }}
                    className="text-xs text-red-400 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-white font-bold">{instructor.fullName}</span>
                  </div>
                  <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Trainer Fee</span>
                </div>
                {selectedPlan && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-slate-700/50">
                    {paymentContext === 'signup' && (
                      <div className="flex justify-between text-[11px] font-bold text-slate-400">
                        <span>Platform Plan ({planObj?.label})</span>
                        <span className="text-white">₦{planObj?.priceNum.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[11px] font-bold text-slate-400">
                      <span>Trainer: {instructor.fullName} (₦{(Number(instructor.rate) || 20000).toLocaleString()} × {selectedPlan === '3months' ? '3' : selectedPlan === '6months' ? '6' : '12'} mo)</span>
                      <span className="text-white">₦{((Number(instructor.rate) || 20000) * (selectedPlan === '3months' ? 3 : selectedPlan === '6months' ? 6 : 12)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-indigo-400 pt-2 border-t border-slate-700/30">
                      <span>Total Due Now</span>
                      <span>₦{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="text-slate-500 text-xs font-medium text-center">
              🔒 Secured by <span className="text-white font-bold">Paystack</span> · Auto-renews · Cancel anytime from settings
            </p>

            {onSkip && (
              <button
                onClick={onSkip}
                className="mt-4 px-8 py-2 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white text-sm font-black uppercase tracking-widest transition-all active:scale-95"
              >
                Skip for now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
