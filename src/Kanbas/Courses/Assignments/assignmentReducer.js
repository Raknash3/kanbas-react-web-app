import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
    assignments: db.assignments,
    selectedAssignment: null,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                ...state.assignments,
                { ...action.payload, _id: new Date().getTime().toString() },
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
            if (state.selectedAssignment && state.selectedAssignment._id === action.payload) {
                state.selectedAssignment = null;
            }
        },
        updateAssignment: (state, action) => {
            state.assignments = [
                ...state.assignments.map((assignment) => {
                    if (assignment._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return assignment;
                    }
                })
            ];
        },
        selectAssignment: (state, action) => {
            state.selectedAssignment = action.payload;
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment, selectAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
