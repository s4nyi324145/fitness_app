
import "../style/exercises.css"
import Navbar from "../components/Navbar"
import ExerciseCard from "../components/ExerciseCard"
import FilterBar from "../components/FilterBar"
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import { useToast } from "../context/toastContext"
import api from "../api/api"



export default function Exercises(){

    const [filter,setFilter] = useState({
        name: "",
        category: "",
        equipment: ""
    })
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [adding, setAdding] = useState(location.state?.adding)
    const [addingExercises, setAddingExercises] = useState([])
    const {showError,showSuccess} = useToast()

    async function getAllExercises() {
        
        try {
            const result = await api.get("/exercises/");
            setExercises(result.data);
        } catch (error) {
            console.error(error);
        } finally {
           setLoading(false)
        }
    }

    useEffect(() => {
        getAllExercises();
    }, []);

    useEffect(() => {console.log(addingExercises)},[addingExercises])
    

    const handleChange = (newfilter) =>{
        setFilter(newfilter)
    }

    function clearFilters(){
        setFilter({
            name: "",
            category: "",
            equipment: ""
        })
    }

  

    const addExercises = async() => {
        try {
            const result = await api.post(`/workouts/${location.state?.workoutId}/exercises`,{addingExercises})
            showSuccess(result.data.message)
            setAddingExercises([])
            
        } catch (error) {
            showError(error.response.data.message)
        }
    }



    return(<>
        <div className="exercises-container">
            <Navbar />
           
            <div className="exercises-main">
                <div className="exercises-header">
                    <h1>Exercise Library</h1>
                    <p>Build your perfect workout routine</p>
                </div>
                
                
                <FilterBar getAllExercises={getAllExercises} adding={adding} filter={filter} onFilterChange={handleChange} clearFilters={clearFilters} /> 
                
                {addingExercises.length > 0 && adding && (
                     <div className="addExercise-info">
                        <button onClick={() => addExercises()} className="addSelectedEx-btn">Add the selected exercises to your workout</button>
                        <div className="countSelectedEx">
                            <p className="selectedExCount">{addingExercises.length}</p>
                            <p>selected exercise</p>
                        </div>
                    </div>
                )}
                
                <div className="exercises-list">

                    {loading ? (
                    
                    <div className="exercises-list loading">
                            <div className="spinner"></div>
                            <p>Loading exercises...</p>
                    </div>
                    
                    ) : (<ExerciseCard adding={adding} addingExercises={addingExercises} setAddingExercises={setAddingExercises}  exercises={exercises} setExercises={setExercises} filter={filter}/>)}
                   
                    
                 
                </div>

                


            </div>


        </div>

    </>)
}