import { combineReducers } from '@reduxjs/toolkit'
import settingSliceReducer from './settingSlice'
import { SLICE } from '@/constant/redux'

export default combineReducers({
  [SLICE.Setting]: settingSliceReducer,

})
