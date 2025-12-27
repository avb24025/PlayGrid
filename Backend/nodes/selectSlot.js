export async function selectSlot(state){
    return {
        ...state,
    selectedSlot: state.messages.at(-1).content,
    };
}