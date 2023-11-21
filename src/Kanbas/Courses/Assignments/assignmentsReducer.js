import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
    assignments: [],
    assignment: { title: "New Assignment", course: "New Course", dueDate: "", fromDate: "", untilDate: "" },
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {

        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        addAssignment: (state, action) => {
            state.assignments = [
                { ...action.payload, },
                ...state.assignments,
            ];
            state.assignment = { title: "New Assignment", course: "New Course", dueDate: "", fromDate: "", untilDate: "" }; // Reset assignment state
        },

        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },

        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
            state.assignment = { title: "New Assignment", course: "New Course", dueDate: "", fromDate: "", untilDate: "" }; // Reset assignment state
        },
        selectAssignment: (state, action) => {
            state.assignment = action.payload;
        },
    },
});

export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    selectAssignment,
    setAssignments
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
