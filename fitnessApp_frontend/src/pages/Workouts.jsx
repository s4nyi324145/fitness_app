import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import WorkoutCard from "../components/WorkoutCard"
import WorkoutFilter from "../components/WorkoutFilter"
import "../style/workouts.css"
import api from "../api/api"
export default function Workouts(){

    const [workouts,setWorkouts] = useState([])
    const [loading,setLoading] = useState(true)
    const [filter,setFilter] = useState({
        name: "",
        startDate: "",
        endDate: ""

    })

    async function getAllWorkout(){
        
     try {
        const result = await api.get("/workouts/")
        //console.log(result)
        setWorkouts(result.data)
     } catch (error) {
        console.log(error)
     }
     finally{
        setLoading(false)
     }
        
    }

    useEffect(() => {getAllWorkout()},[])
    useEffect(() => {console.log(workouts)}, [workouts])


    const handleChange = (newFilter)  => {
        setFilter(newFilter)
    }

    function clearFilters(){
        setFilter({
            name: "",
            startDate: "",
            endDate: ""
        })
    }


    return(
        <>
    <div className="workouts-container">
        <Navbar/>
        <div className="workouts-main">
            <div className="workouts-header">
                <h1>Workouts Library</h1>
                <p>Your personal workouts database</p>
            </div>
            <WorkoutFilter clearFilters={clearFilters} getAllWorkout={getAllWorkout} filter={filter} onChangeFilter={handleChange}/>
            <div className="workouts-list">
                    <WorkoutCard setWorkouts={setWorkouts} workouts={workouts} filter={filter} />
            </div>

        </div>
    </div>
        </>
    )
}