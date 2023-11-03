import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentReducer from "../Courses/Assignments/assignmentReducer";

const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentReducer
    }
});


export default store;

