import { Search, Dumbbell, Wrench, Plus, X,Calendar } from 'lucide-react'
import '../style/filterBar.css'
import { useEffect, useState } from 'react'
import AddWorkoutModal from "../components/AddWorkoutModal"

export default function WorkoutFilter({filter, onChangeFilter, clearFilters, getAllWorkout}) {

    const [isOpen, setIsOpen] = useState(false)

    const handleNameChange = (e) =>{
        onChangeFilter({...filter,name: e.target.value})
    }

    const handleDateChange = (e) =>{
        onChangeFilter({...filter,startDate: e.target.value})
    }

    const handleEndDateChange = (e) =>{
        onChangeFilter({...filter,endDate: e.target.value})
    }

    const hasActiveFilter = (filter.name || filter.startDate || filter.endDate)
    


    return (
        
        <>
            <AddWorkoutModal getAllWorkout={getAllWorkout} isOpen={isOpen} setIsOpen={setIsOpen}/>
            
            <div className="filter-bar">

            
            
    <div className="search-wrapper">
        <Search size={20} className="search-icon" />
        <input 
            type="text"
            value={filter.name}
            onChange={(e) => handleNameChange(e)}
            placeholder="Search wokrouts..."
            className="search-input"
        />
    </div>


    <div className="filters">
    <div className="date-input">
        <Calendar size={18} />
        <input 
            type="date" 
            value={filter.startDate} 
            onChange={(e) => handleDateChange(e)} 
            placeholder="Start date"
        />
    </div>

    <div className="seperate-sign">
        -
    </div>

    <div className="date-input">
        <Calendar size={18} />
        <input 
            type="date" 
            onChange={(e) => handleEndDateChange(e)} 
            value={filter.endDate}
            placeholder="End date"
        />
    </div>
</div>

<button className="add-button" onClick={() => setIsOpen(true)}>
    <Plus size={20} />
    <span>Add Workout</span>
</button>

{hasActiveFilter && (
    <button className="clear-filters-btn" onClick={clearFilters}>
        <X size={16} />
        Clear filters
    </button>
)}
    
            </div>

            

        </>
       
    )
}