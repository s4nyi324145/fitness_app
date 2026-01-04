import { useEffect, useState } from "react"
import api from '../api/api'
import { Dumbbell, TrendingUp } from "lucide-react"

import "../style/dashboardCards.css"

export default function TotalWorkoutCard() {
    const [workouts, setWorkouts] = useState([])
    const [loading, setLoading] = useState(true)

    async function getWorkouts() {
        try {
            const response = await api.get('/workouts/')
            setWorkouts(response.data)
        } catch (error) {
            showError
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getWorkouts()
    }, [])

    if (loading) {
        return (
            <div className="totalWorkoutCard loading">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="totalWorkoutCard card">
            <div className="card-icon-wrapper">
                <Dumbbell size={32} className="card-icon" />
            </div>
            
            <div className="card-content">
                <p className="card-value">{workouts.length}</p>
                <p className="card-label">Total Workouts</p>
            </div>
            
            
            
            
        </div>
    )
}