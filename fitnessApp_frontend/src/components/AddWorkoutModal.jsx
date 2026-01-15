import { X, Dumbbell, Plus } from 'lucide-react'
import { useState } from 'react'
import '../style/addExerciseModal.css'
import api from '../api/api'
import { useToast } from '../context/toastContext'
export default function AddExerciseModal({ isOpen, setIsOpen, getAllWorkout  }) {

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        duration_minutes: '',
        notes: ''
    })
    const [loading, setLoading] = useState(false)
    const {showError,showSuccess} = useToast()



    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            setIsOpen(false)
        }
    }

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
          try {
            
            const response = await  api.post("/workouts/",{
                name: formData.name,
                date: formData.date,
                notes: formData.notes,
                duration_minutes: formData.duration_minutes
            })

            showSuccess(response.data.message || "Workout created!");
            getAllWorkout()
            setTimeout(() => {
                
                setIsOpen(false)
                setLoading(false)
                setFormData({
                    name: '',
                    date: '',
                    duration_minutes: '',
                    notes: ''
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
                        <h2>Create a new Workout</h2>
                    </div>
                    <button className="close-button" onClick={() => setIsOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
             
                    <div className="form-group">
                        <label htmlFor="name">Workout Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g., Push day"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                            required
                            className="form-input"
                        />
                    </div>

            
                    <div className="form-group">
                        <label htmlFor="duration_minutes">Duration (minutes) *</label>
                        <input
                            id="duration_minutes"
                            name="duration_minutes"
                            value={formData.duration_minutes}
                            onChange={handleChange}
                            required
                            placeholder='e.g., 90'
                            type='number'
                            className="form-input"
                        />

                    </div>

          
                    <div className="form-group">
                        <label htmlFor="date">Date *</label>
                        <input
                            id="date"
                            name="date"
                            type='date'
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                   
                    </div>

                 
                    <div className="form-group">
                        <label htmlFor="notes">Notes (optional)</label>
                        <textarea
                            id="notes"
                            name="notes"
                            placeholder="Add notes or instructions..."
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            className="form-textarea"
                        />
                    </div>

             
                    <div className="modal-actions">
                        <button 
                            type="button" 
                            className="cancel-button" 
                            onClick={() => setIsOpen(false)}
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
                                    Create Workout
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}