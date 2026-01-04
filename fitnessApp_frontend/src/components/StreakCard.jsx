import { useEffect, useState } from "react"
import api from '../api/api'
import { Flame, Calendar } from "lucide-react"
import "../style/dashboardCards.css"

export default function StreakCard() {
    const [streakData, setStreakData] = useState({
        currentStreak: 0,
        longestStreak: 20,
        lastWorkoutDate: null
    })
    const [loading, setLoading] = useState(true)

    async function getStreak() {
        try {
            const response = await api.get('/workouts/streak')
            setStreakData(response.data)
        } catch (error) {
            console.error('Error fetching streak:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStreak()
    }, [])

    if (loading) {
        return (
            <div className="totalWorkoutCard loading">
                <div className="spinner"></div>
            </div>
        )
    }

    const isActive = streakData.currentStreak > 0
    const isLongStreak = streakData.currentStreak >= 7
    const isRecordBreaking = streakData.currentStreak === streakData.longestStreak && streakData.currentStreak > 0

    return (
        <div className={` card streak-card ${isLongStreak ? 'hot-streak' : ''}`}>
            <div className="card-icon-wrapper flame-icon">
                <Flame size={32} className="card-icon flame-anim" />
            </div>
            
            <div className="card-content">
                <p className="card-value streak-value">
                    {streakData.currentStreak}
                    {isLongStreak && <span className="fire-emoji">🔥</span>}
                </p>
                <p className="card-label">Day Streak</p>
            </div>
            
        
            {isActive ? (
                <div className="card-trend success flame-trend">
                    <Flame size={16} />
                    <span>
                        {isRecordBreaking 
                            ? "🏆 New record!" 
                            : isLongStreak 
                                ? "On fire! Keep going!" 
                                : "Keep it up!"
                        }
                    </span>
                </div>
            ) : (
                <div className="card-trend danger">
                    <Calendar size={16} />
                    <span>Start a new streak!</span>
                </div>
            )}
            
        
            {streakData.longestStreak > 0 && (
                <div className="card-subinfo">
                    Best: {50} day{streakData.longestStreak !== 1 ? 's' : ''} 
                    {isRecordBreaking && " 🎉"}
                </div>
            )}
            

            {isLongStreak && (
                <div className="flame-particles">
                    <span className="particle">🔥</span>
                    <span className="particle">✨</span>
                    <span className="particle">⚡</span>
                </div>
            )}
            
            <div className="flame-glow"></div>
        </div>
    )
}