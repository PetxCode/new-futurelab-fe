import React, { useState, useEffect } from "react";
import SuperTestRunner from "./SuperTestRunner";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../App";

interface SuperTestStudentWrapperProps {
  userData: any;
  onBack: () => void;
}

const SuperTestStudentWrapper: React.FC<SuperTestStudentWrapperProps> = ({ userData, onBack }) => {
  const [availableTests, setAvailableTests] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActiveTest = async () => {
      try {
        const schoolId = userData?.school || "000000000000000000000000";
        const response = await fetch(`${API_BASE_URL}/api/super-test/school/${schoolId}`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          const sortedTests = data.data.sort((a: any, b: any) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setAvailableTests(sortedTests);
          if (sortedTests.length === 1) {
            setSelectedTest(sortedTests[0]);
          }
        } else {
          setError("No active Super Test available at this time.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch active test");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTest();
  }, [userData]);

  const handleSubmit = async (responses: any[]) => {
    const loadingToast = toast.loading("Submitting test...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/super-test/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: selectedTest._id,
          studentId: userData._id,
          schoolId: userData.school || "000000000000000000000000",
          responses,
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Test submitted successfully!`, { id: loadingToast });
        onBack();
      } else {
        toast.error(data.message || "Failed to submit test.", { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during submission.", { id: loadingToast });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white bg-slate-900 rounded-xl">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading Super Test...</p>
        </div>
      </div>
    );
  }

  if (error || availableTests.length === 0) {
    return (
      <div className="flex flex-col h-full bg-slate-900 text-white rounded-xl items-center justify-center p-8 text-center border border-slate-800">
        <span className="text-6xl mb-4">📭</span>
        <h2 className="text-3xl font-black mb-2 text-indigo-400">No Active Tests</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          {error || "Your instructor hasn't published any Super Tests yet. Check back later!"}
        </p>
        <button onClick={onBack} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold transition">
          Return to Hub
        </button>
      </div>
    );
  }

  if (!selectedTest) {
    return (
      <div className="flex flex-col h-[calc(100vh-2rem)] bg-[#090e1a] text-white rounded-xl overflow-hidden shadow-2xl border border-slate-800 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Available Super Tests</h1>
            <p className="text-slate-400">Select a test to begin your challenge.</p>
          </div>
          <button onClick={onBack} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold text-sm transition">
            ← Back to Hub
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-8">
          {availableTests.map((t) => (
            <div key={t._id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col">
              <h3 className="text-xl font-bold text-indigo-400 mb-2">{t.title}</h3>
              <div className="flex gap-4 text-sm text-slate-400 mb-6">
                <span className="flex items-center gap-1">
                  ⏱️ {t.durationMinutes} mins
                </span>
                <span className="flex items-center gap-1">
                  📝 {t.questions?.length || 0} Questions
                </span>
              </div>
              <button 
                onClick={() => setSelectedTest(t)}
                className="mt-auto w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold text-white transition-colors"
              >
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SuperTestRunner
      testId={selectedTest._id}
      studentId={userData._id}
      durationMinutes={selectedTest.durationMinutes || 30}
      questions={selectedTest.questions || []}
      onBack={() => {
        setSelectedTest(null); // Go back to selection screen instead of Hub
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default SuperTestStudentWrapper;
