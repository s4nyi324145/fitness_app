
import "../style/exercises.css"
import Navbar from "../components/Navbar"
import { Search } from "lucide-react"


export default function Exercises(){

    return(<>
        <div className="exercises-container">
            <Navbar/>
            <div className="exercises-main">
                <div className="exercises-header">
                    <h1 className="exercises-title">
                        Exercises Libary
                    </h1>
                    <p className="exercises-subtitle">
                        Build your perfect workout routine 
                    </p>
                </div>
                <div className="exercises-input">
                     <div className="searchBar">
                        <Search color="white"/>
                        <input type="text" placeholder="Search for exercises" />
                     </div>
                </div>
            </div>
        </div>

    </>)
}