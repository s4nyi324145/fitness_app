import Navbar from "../components/Navbar"
import TotalWorkoutCard from "../components/totalWorkoutCard"
import WeekWorkoutCard from "../components/WeekWorkoutCard"
import StreakCard from "../components/StreakCard"
import WorkoutCalendar from "../components/Calendar"
import "../style/dashboard.css"

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Navbar />
            
            <div className="dashboard-main">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">
                        Welcome back, <span className="highlight">John</span>! 💪
                    </h1>
                    <p className="dashboard-subtitle">
                        Let's crush your fitness goals today
                    </p>
                </div>
                
                <div className="stat-cards">
                    <TotalWorkoutCard />
                    <WeekWorkoutCard />
                    <StreakCard/>
                    
                </div>
                <div className="dashboard-calendar">
                    <WorkoutCalendar/>
                </div>
               
                
               
            </div>
        </div>
    )
}