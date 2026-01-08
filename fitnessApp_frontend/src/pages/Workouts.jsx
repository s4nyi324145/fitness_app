import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import WorkoutCard from "../components/WorkoutCard"
import "../style/workouts.css"
import api from "../api/api"
export default function Workouts(){

    const [workouts,setWorkouts] = useState()
    const [loading,setLoading] = useState(true)

    const getAllWorkout = async() =>{
        
     try {
        const result = await api.get("/workouts/")
        console.log(result)
        setWorkouts(result.data)
     } catch (error) {
        console.log(error)
     }
        
    }

    useEffect(() => {getAllWorkout()},[])
    useEffect(() => {console.log(workouts)}, [workouts])




    return(
        <>
    <div className="workouts-container">
        <Navbar/>
        <div className="workouts-main">
            <div className="workouts-header">
                <h1>Workouts Library</h1>
                <p>Your personal wokrouts database</p>
            </div>
            <div className="workouts-list">
                    <WorkoutCard/>
            </div>

        </div>
    </div>
        </>
    )
}