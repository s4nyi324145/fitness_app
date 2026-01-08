import { X, Dumbbell, Plus } from 'lucide-react'
import { useState } from 'react'
import '../style/addExerciseModal.css'
import api from '../api/api'
import { useToast } from '../context/toastContext'
export default function AddExerciseModal({ isOpen, onClose, getAllExercises }) {

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        equipment: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)
    const {showError,showSuccess} = useToast()



    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            onClose()
        }
    }

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
          try {
            
            const response = await  api.post("/exercises/",{
                name: formData.name,
                category: formData.category,
                equipment: formData.equipment,
                description: formData.description
            })

            showSuccess(response.data.message || "Exercise created!");
            getAllExercises()
            setTimeout(() => {
                onClose()
                setLoading(false)
                setFormData({
                    name: '',
                    category: '',
                    equipment: '',
                    description: ''
                })
            }, 1000);
          } catch (error) {
            showError( error?.response?.data?.message || "Something went wrong")
          }

    }

    
    

    if (!isOpen) return null

    return (
        <div className="modal-backdrop" onClick={(e) => handleBackdropClick(e)}>
            <div className="modal">
         
                <div className="modal-header">
                    <div className="modal-title">
                        <Dumbbell size={24} className="modal-icon" />
                        <h2>Create Custom Exercise</h2>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
             
                    <div className="form-group">
                        <label htmlFor="name">Exercise Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g., Cable Fly"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                            required
                            className="form-input"
                        />
                    </div>

            
                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select category</option>
                            <option value="chest">Chest</option>
                            <option value="back">Back</option>
                            <option value="legs">Legs</option>
                            <option value="arms">Arms</option>
                            <option value="shoulders">Shoulders</option>
                            <option value="core">Core</option>
                            <option value="cardio">Cardio</option>
                        </select>
                    </div>

          
                    <div className="form-group">
                        <label htmlFor="equipment">Equipment *</label>
                        <select
                            id="equipment"
                            name="equipment"
                            value={formData.equipment}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select equipment</option>
                            <option value="barbell">Barbell</option>
                            <option value="dumbbell">Dumbbell</option>
                            <option value="machine">Machine</option>
                            <option value="bodyweight">Bodyweight</option>
                            <option value="cable">Cable</option>
                        </select>
                    </div>

                 
                    <div className="form-group">
                        <label htmlFor="description">Description (optional)</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Add notes or instructions..."
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="form-textarea"
                        />
                    </div>

             
                    <div className="modal-actions">
                        <button 
                            type="button" 
                            className="cancel-button" 
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="button-spinner"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Create Exercise
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}