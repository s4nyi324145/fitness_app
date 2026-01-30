import { Search, Dumbbell, Wrench, Plus } from 'lucide-react'
import '../style/filterBar.css'
import { useEffect, useState } from 'react'
import AddExerciseModal from './AddExerciseModal'

export default function FilterBar({filter,onFilterChange,adding, clearFilters, getAllExercises}) {

    function handleNameChange(e){
        onFilterChange({...filter,name: e.target.value}
        )
    }

    function handleCategoryChange(e){
        onFilterChange({...filter,category: e.target.value}
        )
    }

    function handleEquipmentChange(e){
        onFilterChange({...filter,equipment: e.target.value}
        )
    }

    const hasActiveFilter = (filter.name || filter.category || filter.equipment)
    const [isOpen, setIsOpen] = useState(false)


    function onClose(){
        setIsOpen(false)
    }
    


    return (
        
        <>
            <AddExerciseModal getAllExercises={getAllExercises} isOpen={isOpen} onClose={onClose}/>
            <div className="filter-bar">

            
            
    <div className="search-wrapper">
        <Search size={20} className="search-icon" />
        <input 
            type="text"

            value={filter.name}
            onChange={(e) => handleNameChange(e)}
            placeholder="Search exercises..."
            className="search-input"
        />
    </div>


    <div className="filters">

        <div className="select-wrapper">
            <Dumbbell size={18} className="select-icon" />
            <select value={filter.category} onChange={(e) => handleCategoryChange(e)} className="filter-select">
                <option value="">All Categories</option>
                <option value="chest">Chest</option>
                <option value="back">Back</option>
                <option value="legs">Legs</option>
                <option value="arms">Arms</option>
                <option value="shoulders">Shoulders</option>
                <option value="core">Core</option>
                <option value="cardio">Cardio</option>
            </select>
        </div>

        <div className="select-wrapper">
            <Wrench size={18} className="select-icon" />
            <select value={filter.equipment} onChange={(e) => handleEquipmentChange(e)} className="filter-select">
                <option value="">All Equipment</option>
                <option value="barbell">Barbell</option>
                <option value="dumbbell">Dumbbell</option>
                <option value="machine">Machine</option>
                <option value="bodyweight">Bodyweight</option>
                <option value="cable">Cable</option>
            </select>
        </div>
    </div>
        
    {!adding && (
        <button onClick={() => setIsOpen(prev => !prev)} className="add-button">
        <Plus size={20} />
        <span>Add Exercise</span>
        </button>
    )}

    {hasActiveFilter && (
        <button className="clear-filters-btn" onClick={clearFilters}>
            Clear filters
        </button>
    )}
            </div>

            

        </>
       
    )
}