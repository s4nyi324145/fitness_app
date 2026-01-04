import "../style/dashboardCards.css"
import { useEffect, useState } from "react"
import { Calendar, Target, Plus } from "lucide-react"
import { useToast } from '../context/toastContext.jsx'
import {useAuth} from '../context/autContext.jsx'
import api from "../api/api.js"

export default function  WeekWorkoutCard() {
    const [weekData, setWeekData] = useState({ count: 0, workouts: [] })
    const {showError} = useToast()
    const {user} = useAuth()
    const [loading, setLoading] = useState(true)

    async function weekWorkouts(params) {
        try {
            
            const response = await api.get("/workouts/week")
            setWeekData(response.data)
        } catch (error) {
            showError(error.resposne.data.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() =>{weekWorkouts()}, [])

     if (loading) {
        return (
            <div className="totalWorkoutCard loading">
                <div className="spinner"></div>
            </div>
        )
    }

    const percentage = Math.round((weekData.count / user.profile.workout_days_per_week) * 100)
    const isGoalReached = weekData.count >= user.profile.workout_days_per_week
    return (
        <div className="weekWorkoutCard card">
            <div className="card-icon-wrapper">
                <Calendar size={32} className="card-icon" />
            </div>
            
            {user.profile.workout_days_per_week > 0 ? <> <div className="card-content">
                <p className="card-value">{weekData.count} / {user.profile.workout_days_per_week}</p>
                <p className="card-label">Workout this week</p>
            </div>
             <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            
    
            <div className="card-footer">
                <div className={`card-trend ${isGoalReached ? 'success' : ''}`}>
                <Target size={16} />
                <span>
                    {isGoalReached 
                        ? '🎉 Goal reached!' 
                        : `${percentage}% of weekly goal`
                    }
                </span>
        
            </div>
            <div className="card-addWorkout">
                <button>
                    <Plus/>
                    Add workout
                </button>
            </div>
            </div></> : <>
            
                <div className="addWorkoutGoal">
                    <div className="title-addGoal">
                        <p>You did not set a weekly goal.</p>
                    </div>
                </div>
                <div className="card-addWorkoutGoal">
                    <button>
                        <Plus/>
                        Add workout goal
                    </button>
                </div>
                <p className="card-label">Workout this week</p>
            
            
            </>}
           
          
        </div>
    )
}