import { Search, Dumbbell, Wrench, Plus } from 'lucide-react'
import '../style/filterBar.css'
import { useEffect, useState } from 'react'
import AddExerciseModal from './AddExerciseModal'

export default function WorkoutFilter({filter, onChangeFilter, clearFilters}) {

    const handleNameChange = (e) =>{
        onChangeFilter({...filter,name: e.target.value})
    }

    const handleDateChange = (e) =>{
        onChangeFilter({...filter,startDate: e.target.value})
    }

    const handleEndDateChange = (e) =>{
        onChangeFilter({...filter,endDate: e.target.value})
    }

    const hasActiveFilter = (filter.name || filter.category || filter.equipment)


    return (
        
        <>
            
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

        <div className="">
            <Dumbbell size={18} />
            <input type="date" value={filter.startDate} onChange={(e) => handleDateChange(e)} />
        </div>

        <div className="">
            <Wrench size={18} className="" />
            <input type="date" onChange={(e) => handleEndDateChange(e)} value={filter.endDate} />
        </div>
    </div>
        
    <button  className="add-button">
        <Plus size={20} />
        <span>Add Workout</span>
    </button>
    {hasActiveFilter && (
        <button className="clear-filters-btn" onClick={clearFilters}>
            Clear filters
        </button>
    )}

    
            </div>

            

        </>
       
    )
}