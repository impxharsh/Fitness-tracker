# 🏋️ Fitness Tracker App

A full-stack fitness tracker that empowers users to:

- Set fitness goals and target specific muscle groups
- Get AI-assisted exercise suggestions
- Log detailed workouts with sets and reps
- Receive progressive overload recommendations
- Track full workout history over time

---

## 🚀 Tech Stack

**Frontend**  
- React  
- Tailwind CSS  
- React Router

**Backend**  
- Node.js  
- Express.js  
- MongoDB (MongoDB Atlas)  
- JWT Authentication

---

## 🔐 Core Features

- 🔑 **User Authentication** (Register/Login with JWT)
- 🧠 **Smart Exercise Suggestions** based on selected goals and muscles
- 🏋️ **Workout Logging**: Track sets and reps for each session
- 📈 **Progressive Overload**: Get personalized improvements based on last workout
- 🕓 **Workout History**: View previous workouts in reverse chronological order
- 🌙 **Dark-Themed UI**: Clean, focused, and mobile-responsive interface

---

## 🛠️ Local Setup

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/impxharsh/Fitness-tracker.git
cd Fitness-tracker
cd server
npm install
```

### 2.Create a .env file in the server directory with the following:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```
### 3. setup client
```bash
cd ../client
npm install
```

### 4. Run the App

start backend
```bash
cd ../server
npm start
```

start frontend
```bash
cd ../client
npm start
```



