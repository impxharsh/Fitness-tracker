import React, { useState, useEffect } from "react";
import axios from "axios";
import exercises from "../data/exercises";

const Dashboard = () => {
  const [goal, setGoal] = useState("");
  const [muscles, setMuscles] = useState([]);
  const [lastWorkout, setLastWorkout] = useState(null);
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const fetchLastWorkout = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/last-workout", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLastWorkout(res.data);
      } catch (err) {
        console.error("Failed to fetch last workout", err);
      }
    };
    fetchLastWorkout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/preference",
        { goal, muscles },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Preferences saved!");
    } catch (err) {
      alert("Error saving preferences");
      console.error(err);
    }
  };

  const handleMuscleChange = (e) => {
    const { value, checked } = e.target;
    setMuscles((prev) =>
      checked ? [...prev, value] : prev.filter((m) => m !== value)
    );
  };

  const updateWorkoutInput = (index, field, value) => {
    setWorkoutData((prev) => {
      const updated = [...prev];
      if (!updated[index]) updated[index] = {};
      updated[index] = {
        ...updated[index],
        name:
          exercises[muscles.flat()[index % muscles.length]]?.[index % 3]?.name,
        [field]: value,
      };
      return updated;
    });
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/workout",
        { exercises: workoutData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Workout saved!");
    } catch (err) {
      alert("Error saving workout");
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-10">
        🏋️ Workout Dashboard
      </h2>

      {/* Preferences */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-10 shadow-md space-y-6">
        <div>
          <label className="block font-semibold mb-1 text-gray-200">Body Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            className="w-full bg-gray-900 border border-gray-600 text-white p-2 rounded"
          >
            <option value="">Select goal</option>
            <option value="Lean">Lean</option>
            <option value="Bulky">Bulky</option>
            <option value="Toned">Toned</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-200">Target Muscles</label>
          <div className="flex flex-wrap gap-4">
            {["Chest", "Back", "Arms", "Legs", "Shoulders", "Abs"].map((muscle) => (
              <label key={muscle} className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  value={muscle}
                  onChange={handleMuscleChange}
                  className="accent-blue-500"
                />
                {muscle}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded text-white font-semibold"
        >
          Save Preferences
        </button>
      </form>

      {/* Suggested Exercises */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-blue-400">💡 Suggested Exercises</h3>
        {muscles.length === 0 ? (
          <p className="text-gray-400">Please select muscles to see suggestions.</p>
        ) : (
          muscles.map((muscle) => (
            <div key={muscle} className="mb-4">
              <h4 className="text-lg font-bold text-gray-300">{muscle}</h4>
              <ul className="list-disc ml-6 text-gray-400">
                {exercises[muscle].map((ex, idx) => (
                  <li key={idx}>
                    {ex.name} ({ex.level})
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      {/* Workout Form */}
      <form onSubmit={handleWorkoutSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-green-400">📋 Today's Workout</h3>
        {muscles.flatMap((muscle) => exercises[muscle] || []).map((ex, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold text-gray-300">{ex.name}</p>
            <div className="flex gap-4 mt-1">
              <input
                type="number"
                placeholder="Sets"
                className="w-1/2 bg-gray-900 text-white border border-gray-600 p-2 rounded"
                onChange={(e) => updateWorkoutInput(idx, "sets", Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Reps"
                className="w-1/2 bg-gray-900 text-white border border-gray-600 p-2 rounded"
                onChange={(e) => updateWorkoutInput(idx, "reps", Number(e.target.value))}
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition py-2 rounded text-white font-semibold"
        >
          Save Workout
        </button>
      </form>

      {/* Progressive Overload */}
      <section>
        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🔁 Progressive Overload</h3>
        {muscles.length === 0 ? (
          <p className="text-gray-400">Select muscles to get overload suggestions.</p>
        ) : (
          muscles.map((muscle) => (
            <div key={muscle} className="mb-4">
              <h4 className="text-lg font-bold text-gray-300">{muscle}</h4>
              <ul className="list-disc ml-6 text-gray-400 text-sm">
                {exercises[muscle]?.map((ex) => {
                  const last = lastWorkout?.exercises?.find((e) => e.name === ex.name);
                  const suggestedSets = last ? last.sets : 3;
                  const suggestedReps = last ? last.reps + 2 : 10;

                  return (
                    <li key={ex.name}>
                      {ex.name} ({ex.level}) —{" "}
                      <strong>{suggestedSets} sets × {suggestedReps} reps</strong>
                      {last && (
                        <em className="text-gray-500 ml-2">
                          (Last: {last.sets}×{last.reps})
                        </em>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Dashboard;
