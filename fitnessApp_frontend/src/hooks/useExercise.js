import { useState, useEffect } from "react";
import api from "../api/api";

export function useExercise() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getAllExercises() {
        setLoading(true);
        try {
            const result = await api.get("/exercises/");
            setExercises(result.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllExercises();
    }, []);

    return {
        exercises,
        setExercises,
        getAllExercises,
        loading
    };
}
