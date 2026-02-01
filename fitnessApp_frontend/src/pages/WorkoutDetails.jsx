// pages/WorkoutDetailsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Clock, Calendar,Dumbbell, ScrollText ,ChevronDown, ChevronUp} from 'lucide-react';
import api from '../api/api';
import { useToast } from '../context/toastContext';
import "../style/workoutdetail.css"

function WorkoutDetailsPage() {
    const { workoutId } = useParams();
    const navigate = useNavigate();
    
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openExerciseId, setOpenExerciseId] = useState(null)
    const [hasChanges, setHasChanges] = useState(false)
    const {showSucces, showWarning} = useToast()
    const [nextTempId, setNextTempId] = useState(1);

    useEffect(() => {
        fetchWorkoutDetails();
    }, [workoutId]);

    useEffect(() =>{
        console.log(exercises)
    },[exercises])

    const fetchWorkoutDetails = async () => {
        try {
            setLoading(true);
           
            const workoutRes = await api.get(`/workouts/${workoutId}`);
            setWorkout(workoutRes.data);
            
            const exercisesRes = await api.get(`/workouts/${workoutId}/exercises`);
            setExercises(exercisesRes.data);
            
        } catch (error) {
            console.error('Error fetching workout:', error);
            if (error.response?.status === 404) {
                alert('Workout not found!');
                navigate('/workouts');
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteExercise = async(exercise_id) => {
        if(!window.confirm("Are you sure you want to delete this exercise from you workout?")) return null
        try {
            const result = await api.delete(`/workouts/${workoutId}/exercises/${exercise_id}`)
            console.log(await result.data)
            setExercises(prev => prev.filter(ex => ex.exercise_id !== exercise_id))
        } catch (error) {
            console.log(error)
        }
    }

    const addSetToExercise = (workoutExerciseId) => {
        const tempId = `temp-${nextTempId}`;
        setNextTempId(prev => prev + 1);
        setHasChanges(true)
        setExercises(prev => prev.map(exercise => 
            exercise.workout_exercise_id === workoutExerciseId
                ? {
                    ...exercise,
                    sets: [
                        ...exercise.sets,
                        {
                            set_id : tempId,
                            set_number: exercise.sets.length + 1,
                            reps: exercise.sets.reps || 0,
                            weight_kg: exercise.sets.weight_kg || 0,
                            notes: null,
                            type: "working"
                        }
                    ]
                }
                : exercise
        ));
    };

    const removeSet = (workoutExerciseId) => {
        setHasChanges(true)
        setExercises(prev =>
            prev.map(exercise => {
                if (exercise.workout_exercise_id !== workoutExerciseId) {
                    return exercise;
                }
    
                const newSets = [...exercise.sets];
                newSets.pop();
    
                return {
                    ...exercise,
                    sets: newSets.map(set => ({ ...set }))
                };
            })
        );
    };

    const applyChanges = async (workoutExerciseId, sets) =>{
    
         try {
                const result = await api.post(`/workout-exercises/${workoutExerciseId}/sets`,{sets})
                console.log(await result.data)
                setHasChanges(false)
             

         } catch (error) {
            showWarning(error.response.data.message)
         }

    }

    const updateSetValue = (workoutExerciseId, setId, field, value) => {
        if(!value) value = 0
        console.log(value)
        setHasChanges(true)
        setExercises(prev => prev.map(exercise => 
            exercise.workout_exercise_id === workoutExerciseId
                ? {
                    ...exercise,
                    sets: exercise.sets.map(set => 
                        set.set_id === setId
                            ? { ...set, [field]: field === 'type' ? value : parseInt(value)  }
                            : set
                    )
                }
                : exercise
        ));
        
        
    };


    if (loading) return <div className="loading">Loading...</div>;
    if (!workout) return <div>Workout not found</div>;

    const dateDay = new Date(workout.date)


     

    return (
        <div className="workout-details-page">
        
            <div className="details-header">
                <button onClick={() => navigate('/workouts')} className="back-btn">
                    <ArrowLeft size={20} />
                    Back
                </button>
                
            </div>

         
            <div className="workout-info-card">
                <h1>{workout.name}</h1>
                
                <div className="workout-meta">
                    <div>
                        <Calendar size={18} />
                        <span>{workout.date.split('T')[0]} </span>
                        <span>{dateDay.toLocaleDateString('en-US', {weekday: 'long'})}</span>
                    </div>
                    <div>
                        <Clock size={18} />
                        <span>{workout.duration_minutes} minutes</span>
                    </div>
                </div>
                
                {workout.notes && (
                    <div className="workout-notes">
                        <ScrollText size={18} />
                        <p>{workout.notes}</p>
                    </div>
                )}

                <div className="workout-summary">
                    <div className="exercise">
                        <span className="stat-number">{exercises.length}</span>
                        <span className="stat-label">Exercises</span>
                    </div>
                    
                    <div className="sets">
                        <span className="stat-number">
                            {exercises.reduce((sum, e) => sum + e.sets.length, 0)}
                        </span>
                        <span className="stat-label">Sets</span>
                    </div>
                    
                    <div className="reps">
                        <span className="stat-number">
                            {exercises.reduce((total, ex) => {
                                return total + ex.sets.reduce((sum, set) => 
                                    sum + (set.reps === "" ? 0 : parseInt(set.reps) || 0), 0
                                );
                            }, 0)}
                        </span>
                        <span className="stat-label">Reps</span>
                    </div>
                    
                    <div className="weight">
                        <span className="stat-number">
                            {exercises.reduce((total, ex) => {
                                return total + ex.sets.reduce((sum, set) => 
                                    sum + (set.reps * (set.weight_kg === "" ? 0 : parseFloat(set.weight_kg) || 0)), 0
                                );
                            }, 0).toFixed(1)}
                        </span>
                        <span className="stat-label">Volume (kg)</span>
                    </div>
                </div>
            </div>
            
            
            <div className="add-new-exercise">
                <button onClick={() => {navigate("/exercises", {state: {adding: true, workoutId: workoutId }})}}>Add exercise to this workout</button>
            </div>
     
            <div className="exercises-section">
                <h2>Exercises</h2>
                
                {exercises.length === 0 ? (
                    <div className="exercises-empty">
                        <Dumbbell size={64} />
                        <h3>No exercises found</h3>
                    </div>
                ) : (
                    <div className="exercises-list">

                     
              
                        {exercises.map((ex,index) => {

                            const isOpen = openExerciseId === ex.exercise_id


                            return(
                                <div key={index} className="workout-exercise-card">
                                <div className="exercise-card-header">                    
                                        <div className='exercise-card-information'>
                                            <p className='exerciseName'>{ex.exercise_name}</p>
                                            <div className="exercise-type">
                                                <span><p>{ex.category}</p></span>
                                                <span><p>{ex.equipment}</p></span>
                                            </div>
                                        </div>  
                                  
                                        <div className="exercise-card-icons">
                                            <button onClick={() => deleteExercise(ex.exercise_id)} className='btn-delete'><Trash2  size={16}/></button>
                                            {isOpen ? <ChevronUp className='droppdown-icon' onClick={() => {setOpenExerciseId(null)}} size={16}/> :<ChevronDown className='droppdown-icon' onClick={() => setOpenExerciseId(ex.exercise_id)} size={16} />}
                                        </div>             
                                </div>
                                {isOpen && 
                                    <>
                                        <div className="sets-list">
                                    
                                            <div className="sets-container">
                                                <div className="set-header">
                                                    <p>Set</p>
                                                    <p>Reps</p>
                                                    <p>Weight</p>
                                                </div>                                                                                           
                                              
                                                {ex.sets.map((set,index) => (
                                                    <div key={index} className="set-row">
                                                        <span><p>{set.set_number}</p></span>
                                                        <span><input type="number"  value={set.reps} onChange={(e) => updateSetValue(
                                                                                                    ex.workout_exercise_id, 
                                                                                                    set.set_id, 
                                                                                                    'reps', 
                                                                                                    e.target.value
                                                                                            
                                                                                                )} placeholder='0' />
                                                        </span>
                                                        <span className='setWeight'><input type="number"  value={set.weight_kg} onChange={(e) => updateSetValue(
                                                                                                                ex.workout_exercise_id, 
                                                                                                                set.set_id, 
                                                                                                                'weight_kg', 
                                                                                                                e.target.value
                                                                                                            )} placeholder='0'  /> kg</span>
                                                        <span className={`setType ${set.type == "working" ? "working" : "warmUp"}`} onClick={() => updateSetValue(ex.workout_exercise_id, set.set_id, 'type', set.type == "working" ? "warmUp" : "working")}>{set.type == "working" ? "working" : "warmup"}</span>                               
                                                    </div>
                                                    ))}                                    
                                                
                                            </div>
                             
                                        </div>
                                <div className="sets-button">
                                    <div className="add-set">
                                        <button onClick={() => addSetToExercise(ex.workout_exercise_id)}>Add set</button>
                                    </div>
                                    <div className="remove-set">
                                        <button onClick={() => removeSet(ex.workout_exercise_id)}>Remove set</button>
                                    </div>
                                    {hasChanges && (
                                        <div className="add-set">
                                            <button onClick={() => applyChanges(ex.workout_exercise_id, ex.sets)}>Apply changes</button>
                                        </div>
                                    )}
                                </div>
                                    
                                    </>

                                }

                            </div>
                            )
                        })}
                    </div>
                )}

                
            </div>
            
           
        </div>
    );
}

export default WorkoutDetailsPage;