import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../style/workoutCalendar.css'
import api from '../api/api'
import { Dumbbell, Calendar as CalendarIcon, Clock,ScrollText } from 'lucide-react'

export default function WorkoutCalendar() {

    const [date,setDate] = useState(new Date())
    const [workouts, setWorkouts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedWorkout, setSelectedWorkout] = useState([])

    async function getWorkouts() {
        try {
            const response = await api.get('/workouts/')
            setWorkouts(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getWorkouts()

    }, [])

    useEffect(() => {
        console.log(selectedWorkout)

    }, [selectedWorkout])

    const hasWorkout = (date) =>{
        return workouts.some(workout => {
        const workoutDate = new Date(workout.date)

        return (
        workoutDate.getDate() === date.getDate() &&
        workoutDate.getMonth() === date.getMonth() &&
        workoutDate.getFullYear() === date.getFullYear()


        )
        })
    }

    const getWorkoutsForDate = (date) => {
        return workouts.filter(workout => {
            const workoutDate = new Date(workout.date)
            return (
                workoutDate.getDate() === date.getDate() &&
                workoutDate.getMonth() === date.getMonth() &&
                workoutDate.getFullYear() === date.getFullYear()
            )
        })
    }

    const handleDateChange = (newDate) =>{
        setDate(newDate)
        const dayWorkouts = getWorkoutsForDate(newDate)
        setSelectedWorkout(dayWorkouts)
    }

    function tileContent({ date, view }) {
        if (view === 'month' && hasWorkout(date)) {
            return (
           <div className="workout-indicator">
                    <div className="workout-dot"></div>
                    <span className="workout-count">{1}</span>
            </div>
            )
        }
        else return null

    
}
    const tileClassName = ({ date, view }) => { 
        if (view === 'month') {
            if (hasWorkout(date)) {
                return 'has-workout'
            }
            
            const today = new Date()
            if (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            ) {
                return 'today'
            }
           
        }
        return null
    }

    if (loading) {
        return (
            <div className="calendar-container loading">
                <div className="spinner"></div>
            </div>
        )
    }

    return(<>

            <div className="calendar-container">
                <div className="calendar-header">
                    <CalendarIcon size={24} className="calendar-icon" />
                    <h2>Workout Calendar</h2>
                </div>

                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    tileContent={tileContent}
                    tileClassName={tileClassName}
                    locale="en-GB"
                />
            </div>
            {selectedWorkout.length > 0 && (
                <div className="selected-day-details">
                    <h3>
                        {date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </h3>
                    
                    <div className="day-workouts">
                        {selectedWorkout.map((workout) => (
                            <div key={workout.id} className="day-workout-card">
                                <div className="workout-card-header">
                                    <Dumbbell size={20} />
                                    <h4>{workout.name}</h4>
                                </div>
                                <div className="workout-card-info">
                                    <span className="workout-time"><Clock/> {workout.duration_minutes} min</span>
                                    {workout.notes && (
                                        <span className="workout-notes"><ScrollText/> {workout.notes}</span>
                                    )}
                                </div>
                                <button className='workout-details'>Whatch details</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
    </>)
}