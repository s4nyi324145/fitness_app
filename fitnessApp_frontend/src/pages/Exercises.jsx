
import "../style/exercises.css"
import Navbar from "../components/Navbar"
import ExerciseCard from "../components/ExerciseCard"
import FilterBar from "../components/FilterBar"
import { useState, useEffect } from "react"
import api from "../api/api"



export default function Exercises(){

    const [filter,setFilter] = useState({
        name: "",
        category: "",
        equipment: ""
    })
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

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



    return(<>
        <div className="exercises-container">
            <Navbar />
            
            <div className="exercises-main">
                <div className="exercises-header">
                    <h1>Exercise Library</h1>
                    <p>Build your perfect workout routine</p>
                </div>
                
                
                <FilterBar getAllExercises={getAllExercises} filter={filter} onFilterChange={handleChange} clearFilters={clearFilters} /> 
                
             
                
                <div className="exercises-list">

                    {loading ? (
                    
                    <div className="exercises-list loading">
                            <div className="spinner"></div>
                            <p>Loading exercises...</p>
                    </div>
                    
                    ) : (<ExerciseCard  exercises={exercises} setExercises={setExercises} filter={filter}/>)}
                   
                    
                 
                </div>
            </div>


        </div>

    </>)
}