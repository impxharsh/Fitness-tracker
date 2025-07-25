import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkoutHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/workout-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch workout history", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
        📚 Workout History
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-400 text-center">No workouts recorded yet.</p>
      ) : (
        <div className="space-y-6">
          {history.map((workout, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl text-green-400 font-semibold mb-2">
                🗓️ {new Date(workout.date).toLocaleDateString()}
              </h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-300">
                {workout.exercises.map((ex, i) => (
                  <li key={i}>
                    <span className="font-medium text-white">{ex.name}</span>:{" "}
                    {ex.sets} sets × {ex.reps} reps
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
