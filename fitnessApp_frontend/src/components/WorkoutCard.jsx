import { Award, Clock,Dumbbell, ScrollText, Eye, Edit2, Trash2 } from 'lucide-react';
import { useEffect, useState } from "react"
import "../style/workoutcard.css"

export default function WorkoutCard({workouts, filter}){

    const [filteredList, setFilteredList] = useState(workouts)

    useEffect(() =>{
        let filtered = workouts

        if(filter.name){
            filtered = filtered.filter(w =>  w.name.toLowerCase().includes(filter.name.toLowerCase()))
        }

        if(filter.startDate){
            filtered = filtered.filter(w => w.date.split('T')[0] >= filter.startDate)
        }
        if(filter.endDate){
            filtered = filtered.filter(w => w.date.split('T')[0] <= filter.endDate)
        }
       
        setFilteredList(filtered)
        
    },[filter, workouts])

    return(
        <>
          {filteredList.length === 0 && (
                
                <div className="exercises-empty">
                        <Dumbbell size={64} />
                        <h3>No workout found</h3>
                        <p>Try different filters or add a new workout</p>
                </div>
            
            )}




            {filteredList.map(workout => (
    <div key={workout.id} className="workoutcard">
        <div className="workoutcard-header">
            <div>
                <p>{workout.name}</p>
                <Award />
            </div>
            <div>
                <p>{workout.date.split('T')[0]}</p>
            </div>
        </div>
        <div className="workoutcard-main">
            <div>
                <Clock />
                <p>{workout.duration_minutes} minutes</p>
            </div>
            <div>
                <ScrollText />
                <p>{workout.notes}</p>
            </div>
        </div>
        <div className="workoutcard-buttons">
            <button className="btn-details">
                <Eye size={16} />
                Details
            </button>
            <button className="btn-edit">
                <Edit2 size={16} />
                Edit
            </button>
            <button className="btn-delete">
                <Trash2 size={16} />
            </button>
        </div>
    </div>
            ))}
        
        </>)
}