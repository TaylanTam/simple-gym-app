import {createSlice} from '@reduxjs/toolkit';
import {queryClient} from "../../api/instances/queryClient";


const initialState = {
    workoutStarted: false,
    exercises: [],
    // timer: []
}

const initialExerciseDetails = {
    sets: 0,
    reps: 0,
    weight: 0
}

export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        startWorkout: (state) => {
            state.workoutStarted = true
        },
        clearWorkout: () => {
            return initialState;
        },
        addExercises: (state, action) => {
            const exercises = queryClient.getQueryData("exercise");
            const exercisesToAdd = action.payload.map(id => exercises.find(exercise => exercise.id === id));
            exercisesToAdd.map(exercise => exercise["workout_exercise_details"] = [initialExerciseDetails])
            exercisesToAdd.map(exercise => exercise["exercise"] = exercise.id)
            state.exercises.push(...exercisesToAdd);
        },
        deleteExercise: (state, action) => {
            state.exercises.splice(action.payload, 1);
        },
        addExerciseDetails: (state, action) => {
            state.exercises[action.payload]["workout_exercise_details"].push(initialExerciseDetails);
        },
        updateExerciseDetails: (state, action) => {
            const {exerciseIndex, index, name, value} = action.payload;
            state.exercises[exerciseIndex]["workout_exercise_details"][index][name] = value;
        },
        deleteExerciseDetails: (state, action) => {
            const {exerciseIndex, index} = action.payload;
            state.exercises[exerciseIndex]["workout_exercise_details"].splice(index, 1);
        },
        // setTimerStatus: (state, action) => {
        //     const {exerciseIndex, value} = action.payload;
        //     state.timer[exerciseIndex].status = value;
        // },
        // setTimeValue: (state, action) => {
        //     const {exerciseIndex, value} = action.payload;
        //     state.timer[exerciseIndex].time = value;
        // },
        // getTimerStatus: (state, action) => {
        //     const {exerciseIndex, value} = action.payload;
        //     if(state.timer[exerciseIndex]?.status === undefined) {
        //         state.timer[exerciseIndex].status = false;
        //     }
        //
        //     return state.timer[exerciseIndex]?.status;
        // }
    },
})

export const {
    startWorkout,
    clearWorkout,
    addExercises,
    deleteExercise,
    addExerciseDetails,
    updateExerciseDetails,
    deleteExerciseDetails
} = workoutSlice.actions;

export default workoutSlice.reducer;