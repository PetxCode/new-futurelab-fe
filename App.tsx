import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AiTips from "./components/AiTips";
import Assignments from "./components/Assignments";
import Analytics from "./components/Analytics";
import SubjectsPage from "./components/SubjectsPage";
import Focus from "./components/Focus";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth";
import Settings from "./components/Settings";
import AdminUsers from "./components/AdminUsers";
import CodingEngine from "./components/CodingEngine";
import EngineBlocks from "./components/EngineBlocks";
import ML4Kids from "./components/ML4Kids";
import NextTeach from "./components/NextTeach";
import Projects from "./components/Projects";
import Utilities from "./components/Utilities";
import JuniorCode from "./components/JuniorCode";
import CodeBattle from "./components/CodeBattle";
import SuperTestStudentWrapper from "./components/SuperTestStudentWrapper";
import AdminSuperTestDashboard from "./components/AdminSuperTestDashboard";
import BlogList from "./components/Blog/BlogList";
import BlogPost from "./components/Blog/BlogPost";
import BlogDashboard from "./components/Blog/BlogDashboard";
import LearningPath from "./components/LearningPath";
import InstructorReportForm from "./components/InstructorReportForm";
import AdminReportDashboard from "./components/AdminReportDashboard";
import ErrorBoundary from "./components/ErrorBoundary";

import GameCenter from "./components/Game/GameCenter";
import PaymentPlan from "./components/PaymentPlan";
import AllTrainers from "./components/AllTrainers";
import { NavigationItem, User } from "./types";
import toast, { Toaster } from "react-hot-toast";
import PoweredByNext from "./components/PoweredByNext";

export const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : // ? 'https://futurelab-main-be.onrender.com'
      "https://futurelab-main-be.onrender.com";
// : 'https://futurelab-main-be.onrender.com';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationItem>("Hub");
  const [tabResetKey, setTabResetKey] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<
    string | null
  >(null);
  const [showAllTrainers, setShowAllTrainers] = useState(false);
  const [userData, setUserData] = useState<User | null>(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentContext, setPaymentContext] = useState<"signup" | "trainer">(
    "signup",
  );
  const [pendingUserData, setPendingUserData] = useState<any>(null);

  // Focus Timer Global State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [focusMode, setFocusMode] = useState<"Work" | "Break">("Work");

  const fetchUserData = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/me`, {
        headers: { "x-auth-token": authToken },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        localStorage.setItem("userData", JSON.stringify(data));
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/user/me`, {
            headers: { "x-auth-token": token },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            localStorage.setItem("userData", JSON.stringify(data));
            setIsAuthenticated(true);
          } else if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            setIsAuthenticated(false);
            setUserData(null);
          }
        } catch (error) {
          console.error("Auth check failed (network/server error)", error);
        }
      }
      setIsLoadingAuth(false);
    };

    // Re-hydrate pending signup data if user refreshed
    const savedPending = sessionStorage.getItem("pendingSignupUserData");
    if (savedPending && !isAuthenticated && !showPayment) {
      try {
        const parsed = JSON.parse(savedPending);
        setPendingUserData(parsed);
        setShowPayment(true);
        setAuthMode(null);
      } catch (e) {}
    }

    checkAuth();
  }, []);

  // Handle Paystack redirect back after payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");
    const paymentType = params.get("payment_type");

    if (reference) {
      if (paymentType === "signup") {
        const storedPendingUser = sessionStorage.getItem(
          "pendingSignupUserData",
        );
        if (storedPendingUser) {
          const userData = JSON.parse(storedPendingUser);
          // Complete registration
          fetch(`${API_BASE_URL}/api/auth/register-with-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...userData, reference }),
          })
            .then((r) => r.json())
            .then((data) => {
              if (data.token) {
                sessionStorage.removeItem("pendingSignupUserData");
                window.history.replaceState({}, "", "/");
                setShowPayment(false);
                setAuthMode("login");
                toast.success(
                  "Account created successfully! Please log in to continue.",
                );
              } else {
                toast.error(
                  data.message || "Registration failed after payment",
                );
              }
            })
            .catch(console.error);
        }
      } else if (localStorage.getItem("token")) {
        // Upgrade existing user scenario
        fetch(`${API_BASE_URL}/api/payment/verify/${reference}`, {
          headers: { "x-auth-token": localStorage.getItem("token") || "" },
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.subscription?.status === "active") {
              window.history.replaceState({}, "", "/");
              fetchUserData();
              setIsAuthenticated(true);
              setShowPayment(false);
            }
          })
          .catch(console.error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (focusMode === "Work") {
        const logFocus = async () => {
          try {
            await fetch(`${API_BASE_URL}/api/analytics/focus`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token") || "",
              },
              body: JSON.stringify({ duration: 25 }), // Default Pomodoro duration
            });
            fetchUserData();
          } catch (err) {
            console.error("Error logging focus session:", err);
          }
        };
        logFocus();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(focusMode === "Work" ? 25 * 60 : 5 * 60);
  };
  const changeMode = (mode: "Work" | "Break") => {
    setFocusMode(mode);
    setIsActive(false);
    setTimeLeft(mode === "Work" ? 25 * 60 : 5 * 60);
  };
  const adjustTimer = (seconds: number) => {
    setTimeLeft((prev) => Math.max(60, prev + seconds));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setAuthMode(null);
    fetchUserData();
  };

  const handlePaymentNeeded = (user: any) => {
    sessionStorage.setItem("pendingSignupUserData", JSON.stringify(user));
    setPendingUserData(user);
    setAuthMode(null);
    setPaymentContext("signup");
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setIsAuthenticated(true);
    fetchUserData();
  };

  const handlePaymentSkip = () => {
    sessionStorage.removeItem("pendingSignupUserData");
    setPendingUserData(null);
    setShowPayment(false);
    setAuthMode(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setActiveTab("Hub");
  };

  const handleAssignTrainer = async (trainerId: string, trainer: any) => {
    // Instead of direct assignment, we now show the payment plan
    localStorage.setItem(
      "selectedInstructor",
      JSON.stringify({
        id: trainerId,
        fullName: trainer.fullName,
        rate: trainer.instructorProfile?.monthlyRate || 20000,
      }),
    );
    setPaymentContext("trainer");
    setShowPayment(true);
    // Note: No more direct API call here. Payment plan will handle it.
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setShowScrollTop(scrollContainerRef.current.scrollTop > 200);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Auto-scroll to top on navigation/tab change
      container.scrollTo(0, 0);
      handleScroll();
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [activeTab]); // Remove isAuthenticated if not strictly needed for scroll reset

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-inter">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 font-medium animate-pulse">
            Initializing FutureLab...
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Hub":
        return (
          <Dashboard
            userData={userData}
            onNavigate={(tab) => setActiveTab(tab)}
            onBlogClick={(slug) => {
              setActiveTab("Blog");
              setSelectedBlogPostSlug(slug);
            }}
          />
        );
      case "Assignments":
        return <Assignments userData={userData} onUpdate={fetchUserData} />;
      case "Analytics":
        return <Analytics />;
      case "Courses":
        return <SubjectsPage userData={userData} onUpdate={fetchUserData} />;
      // case 'Focus':
      //   return (
      //     <Focus
      //       timeLeft={timeLeft}
      //       isActive={isActive}
      //       mode={focusMode}
      //       onToggle={toggleTimer}
      //       onReset={resetTimer}
      //       onChangeMode={changeMode}
      //       onAdjust={adjustTimer}
      //     />
      //   );
      // case 'AI Study Coach':
      //   return <AiTips />;
      case "Settings":
        return <Settings userData={userData} onUpdate={fetchUserData} />;
      case "Admin Users":
        return <AdminUsers userData={userData} isSchoolContext={false} />;
      case "School Registry":
        return <AdminUsers userData={userData} isSchoolContext={true} />;
      case "Games":
        return <GameCenter />;
      case "Junior Code":
        return <JuniorCode userData={userData} />;
      case "Code Battle":
        return <CodeBattle />;
      case "Super Test":
        if (userData?.isAdmin || userData?.isSchoolAdmin) {
          // Provide a schoolId for the admin dashboard
          return (
            <AdminSuperTestDashboard
              schoolId={userData.school || "000000000000000000000000"}
            />
          );
        }
        return (
          <SuperTestStudentWrapper
            userData={userData}
            onBack={() => setActiveTab("Hub")}
          />
        );
      case "Python Engine":
        return <CodingEngine />;
      case "Engine Blocks":
        return <EngineBlocks />;
      case "ML4Kids":
        return <ML4Kids onNavigate={(tab) => setActiveTab(tab)} />;
      case "NEXT Teach":
        return <NextTeach userData={userData} />;
      case "Projects":
        return <Projects userData={userData} />;
      case "Utilities":
        return <Utilities />;
      case "Blog":
        if (selectedBlogPostSlug) {
          return (
            <BlogPost
              slug={selectedBlogPostSlug}
              userData={userData}
              onBack={() => setSelectedBlogPostSlug(null)}
            />
          );
        }
        return (
          <BlogList onNavigate={(slug) => setSelectedBlogPostSlug(slug)} />
        );
      case "Write Blog":
        return <BlogDashboard userData={userData} />;
      case "Learning Path":
        return <LearningPath user={userData} />;
      case "Trainers":
        return (
          <AllTrainers
            userData={userData}
            onAssign={(id) => {
              // Find the trainer object to pass the name and rate
              // AllTrainers handles its own fetching, but we need the data here too
              // Actually, AllTrainers can pass the full object
            }}
            onEngage={(trainer) => {
              handleAssignTrainer(trainer.id, trainer);
            }}
          />
        );
      case "Reports":
        if (userData?.isAdmin || userData?.isSchoolAdmin)
          return <AdminReportDashboard />;
        if (userData?.isInstructor) return <InstructorReportForm />;
        return (
          <div className="flex flex-col items-center justify-center h-full py-40 gap-4">
            <span className="text-5xl">🔒</span>
            <h2 className="text-2xl font-black text-white">
              Access Restricted
            </h2>
            <p className="text-slate-400 text-sm">
              Only instructors and school admins can view reports.
            </p>
          </div>
        );
      default:
        return (
          <Dashboard
            userData={userData}
            onNavigate={(tab) => setActiveTab(tab)}
            onBlogClick={(slug) => {
              setActiveTab("Blog");
              setSelectedBlogPostSlug(slug);
            }}
          />
        );
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1rem",
            fontWeight: "bold",
          },
          success: {
            iconTheme: {
              primary: "#6366f1",
              secondary: "#fff",
            },
          },
        }}
      />

      {!isAuthenticated && !authMode && !showPayment && !showAllTrainers && (
        <LandingPage
          onStart={() => setAuthMode("signup")}
          onLogin={() => setAuthMode("login")}
          onViewAllTrainers={() => setShowAllTrainers(true)}
        />
      )}

      {showAllTrainers && !isAuthenticated && (
        <AllTrainers
          onBack={() => setShowAllTrainers(false)}
          onEngage={(trainer) => {
            localStorage.setItem("selectedInstructor", JSON.stringify(trainer));
            setShowAllTrainers(false);
            setAuthMode("signup");
          }}
        />
      )}

      {authMode && (
        <Auth
          mode={authMode}
          onBack={() => setAuthMode(null)}
          onSwitchMode={(mode) => setAuthMode(mode)}
          onSuccess={handleLogin}
          onPayment={handlePaymentNeeded}
        />
      )}

      {showPayment && !isAuthenticated && (
        <ErrorBoundary
          fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-black text-xl">
              Payment System Interrupted. Please refresh.
            </div>
          }
        >
          <PaymentPlan
            userData={pendingUserData}
            paymentContext={paymentContext}
            onSuccess={handlePaymentSuccess}
            onSkip={handlePaymentSkip}
          />
        </ErrorBoundary>
      )}

      {isAuthenticated && showPayment && (
        <div className="fixed inset-0 z-[100] bg-slate-900">
          <PaymentPlan
            userData={userData}
            paymentContext={paymentContext}
            onSuccess={() => {
              setShowPayment(false);
              fetchUserData();
            }}
            onSkip={() => setShowPayment(false)}
          />
        </div>
      )}

      {isAuthenticated && !showPayment && (
        <div className="flex h-screen bg-slate-900 overflow-hidden font-inter text-slate-100 selection:bg-indigo-500/30">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              if (tab === activeTab) {
                setTabResetKey((prev) => prev + 1);
              } else {
                setActiveTab(tab);
                setTabResetKey(0); // Optional: Reset on tab switch
              }
              setSidebarOpen(false);
            }}
            isOpen={isSidebarOpen}
            onToggle={() => setSidebarOpen(!isSidebarOpen)}
            timerState={{ timeLeft, isActive, mode: focusMode }}
            onLogout={handleLogout}
            userData={userData}
          />

          <main
            ref={scrollContainerRef}
            className={`flex-1 ${activeTab === "Engine Blocks" || activeTab === "Python Engine" || activeTab === "Junior Code" ? "overflow-hidden" : "overflow-y-auto"} h-full relative pt-16 md:pt-0`}
          >
            <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-xl flex items-center px-6 z-30 border-b border-slate-800 md:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-slate-300 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <div className="flex flex-col items-end group">
                <span className="font-black text-xl tracking-tight text-white flex items-center">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-indigo-600/30">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-white fill-current"
                    >
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                    </svg>
                  </div>
                  FutureLab
                </span>
                <PoweredByNext className="-mt-1 mr-1 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </header>

            <div
              className={`${activeTab === "Engine Blocks" || activeTab === "Python Engine" || activeTab === "Junior Code" ? "h-full w-full" : "max-w-7xl mx-auto p-6 md:p-12"}`}
            >
              <ErrorBoundary key={`${activeTab}-${tabResetKey}`}>
                {renderContent()}
              </ErrorBoundary>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className={`fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-600/40 border border-indigo-500 transition-all duration-500 z-50 hover:scale-110 active:scale-95 group ${
                showScrollTop
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12 pointer-events-none"
              }`}
              aria-label="Scroll to top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:-translate-y-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </main>
        </div>
      )}
    </>
  );
};

export default App;
