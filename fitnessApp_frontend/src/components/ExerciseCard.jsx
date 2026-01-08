import { Dumbbell, Target, Wrench, User, Trash2 } from 'lucide-react'
import '../style/exerciseCard.css'
import api from '../api/api'
import { useEffect, useState } from 'react'
import { useToast } from '../context/toastContext'
import { useExercise } from '../hooks/useExercise'
export default function ExerciseCard({filter, exercises, setExercises, loading}) {

    
    const [filteredList, setFilteredList] = useState([])

    const {showError, showSuccess} = useToast()




    async function handleDelete(exerciseId){
        try {
            const result = await api.delete(`/exercises/${exerciseId}`)
            showSuccess(result.data.message || "Exercise deleted!")
            setExercises(exercises => exercises.filter(ex => ex.id !== exerciseId))
        } catch (error) {
            showError(error.response.data.message)
            await getAllexercises()
        }
    }

    useEffect(() => {
        let filtered = exercises;
    
        if (filter.name) {
            filtered = filtered.filter(ex =>
                ex.name.toLowerCase().includes(filter.name.toLowerCase())
            );
        }
    
        if (filter.category) {
            filtered = filtered.filter(ex =>
                ex.category === filter.category
            );
        }
    
        if (filter.equipment) {
            filtered = filtered.filter(ex =>
                ex.equipment === filter.equipment
            );
        }
    
        setFilteredList(filtered);
    }, [filter, exercises]);
    

   
    useEffect(() => {console.log(exercises)}, [exercises])

    
    const getCategoryColor = (category) => {
        const colors = {
            chest: '#ff6b35',
            back: '#667eea',
            legs: '#f093fb',
            arms: '#48bb78',
            shoulders: '#ed8936',
            core: '#f7931e',
            cardio: '#f56565'
        }
        return colors[category.toLowerCase()] || '#ff6b35'
    }


    
    
    
    return (
        <>
            

            {filteredList.length === 0 && (
                
                <div className="exercises-empty">
                        <Dumbbell size={64} />
                        <h3>No exercises found</h3>
                        <p>Try different filters or add a new exercise</p>
                </div>
            
            )}
            {filteredList.map(exercise => {
                
                return(
                    <div key={exercise.id} className="exercise-card" style={{ '--category-color': getCategoryColor(exercise.category) }}>
                    
                {exercise.is_custom === 1 && (
                    <div className='badge'>
                        <div onClick={() => handleDelete(exercise.id)} className="delete-icon">
                            <Trash2 size={40} />
                        </div>
                        <div className="custom-badge">
                                
                                <User size={14} />
                                <span>Your Exercise</span>
                        </div>
                    
                    </div>
                )}


                <div className="exercise-content">

                    <div className="exercise-icon">
                        <Dumbbell size={24} />
                    </div>
                    
                
                    <div className="exercise-info">
                        <h3 className="exercise-name">{exercise.name}</h3>
                        
                        <div className="exercise-meta">
                            <span className="meta-item category">
                                <Target size={14} />
                                {exercise.category}
                            </span>
                            
                            <span className="meta-item equipment">
                                <Wrench size={14} />
                                {exercise.equipment}
                            </span>
                        </div>
                    </div>


                </div>
                </div>
                )

            })}
        </>
    )
}