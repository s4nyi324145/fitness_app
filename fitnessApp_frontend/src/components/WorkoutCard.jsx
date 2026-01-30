import { Award, Clock, ScrollText, Eye, Edit2, Trash2, Check, X, Calendar } from 'lucide-react';
import { useEffect, useState } from "react"
import "../style/workoutcard.css"
import { useToast } from '../context/toastContext'
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function WorkoutCard({workouts,setWorkouts, filter}){

    const [filteredList, setFilteredList] = useState(workouts)
    const {showError,showSuccess} = useToast()
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const navigate = useNavigate()

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


    const handleDelete =  async (workoutId) => {
        if(!window.confirm("Are you sure you want to delete this workout from your library?")) return null
        try {
            const result = await api.delete(`/workouts/${workoutId}`)
            showSuccess(result.data.message)
            setWorkouts(workouts => workouts.filter(w => w.id !== workoutId))
        } catch (error) {
            console.log(error)
            showError(error?.data?.result?.message || "Something went wrong")
           
        }
    }

    const handleEditClick = (workout) => {
        setEditingId(workout.id);
        setEditData({
            name: workout.name,
            duration_minutes: workout.duration_minutes,
            notes: workout.notes,
            date: workout.date
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleSave = async (workoutId) =>{
            try {
                const result = await api.put(`/workouts/${workoutId}`,{
                    name: editData.name,
                    duration_minutes: editData.duration_minutes,
                    notes: editData.notes,
                    date: editData.date

                })
                showSuccess(result.data.message)
                handleCancel()
                setWorkouts(prev => prev.map(workout => 
                    workout.id === workoutId 
                        ? { ...workout, ...editData } 
                        : workout
                ));
            } catch (error) {
                console.log(error)
                showError(error.response.data.message)
            }
    }

    return(
        <>
          {filteredList.map(workout => (
    <div key={workout.id} className="workoutcard">
        {editingId === workout.id ? (
      
            <>
                <div className="workoutcard-edit">
                    <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="edit-input"
                        placeholder="Workout name"
                    />
                    <div className="edit-row">
                        <Calendar size={16} />
                        <input
                            type="date"
                            value={editData.date}
                            onChange={(e) => setEditData({...editData, date: e.target.value})}
                            className="edit-input-small"
                        />
                    </div>
                    <div className="edit-row">
                        <Clock size={16} />
                        <input
                            type="number"
                            value={editData.duration_minutes}
                            onChange={(e) => setEditData({...editData, duration_minutes: e.target.value})}
                            className="edit-input-small"
                            placeholder="Minutes"
                        />
                    </div>
                    <div className="edit-row">
                        <ScrollText size={16} />
                        <textarea
                            value={editData.notes}
                            onChange={(e) => setEditData({...editData, notes: e.target.value})}
                            className="edit-textarea"
                            placeholder="Notes"
                        />
                    </div>
                </div>
                <div className="workoutcard-buttons">
                    <button onClick={() => handleSave(workout.id)} className="btn-save">
                        <Check size={16} />
                        Save
                    </button>
                    <button onClick={handleCancel} className="btn-cancel">
                        <X size={16} />
                        Cancel
                    </button>
                </div>
            </>
        ) : (
      
            <>
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
                        <p>{!workout.notes ? "Add custom note" : workout.notes}</p>
                    </div>
                </div>
                <div className="workoutcard-buttons">
                    <button onClick={() => navigate(`/workouts/${workout.id}`)} className="btn-details">
                        <Eye size={16} />
                        Details
                    </button>
                    <button onClick={() => handleEditClick(workout)} className="btn-edit">
                        <Edit2 size={16} />
                        Edit
                    </button>
                    <button onClick={() => handleDelete(workout.id)} className="btn-delete">
                        <Trash2 size={16} />
                    </button>
                </div>
            </>
        )}
    </div>
))}
        
        </>)
}