import { combineReducers } from "redux";

export const resourceReducer = (resources = [], action) => {
    if (action.type === "AddResources") {
        return [...resources, ...action.payload]
    }
    return resources
}

export const changePageNumberReducer = (pageNumber = 0, action) => {
    if (action.type === "ChangePageNumber") {
        return action.payload
    }
    return pageNumber
}

export default combineReducers({
    resources: resourceReducer,
    pageNumber: changePageNumberReducer
})