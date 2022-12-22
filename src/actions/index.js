export const AddResources = (resources) => {
    return {
        type: "AddResources",
        payload: resources
    }
}

export const changePageNumber = (pageId) => {
    return {
        type: "ChangePageNumber",
        payload: pageId
    }
}