import { combineSlices } from "@reduxjs/toolkit";
import currentSlice from "./current-slice";
import apiSlice from "./api-slice";

export const rootReducer = combineSlices(currentSlice, apiSlice);
