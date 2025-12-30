export async function selectTurf(state){
    if(!state.filters.turfName){
        return {
        ...state,
    messages: [
      ...state.messages,    
        {
            role: "assistant",
            content: "Please specify a turf name to select a turf.",
        },
    ],
    };
    }
    return {
        ...state,
         messages: [
      ...state.messages,    
        {
            role: "assistant",
            content: "You have selected turf "+state.filters.turfName+".",
        },
    ],
    selectedTurf: state.filters.turfName,
    };

}  
