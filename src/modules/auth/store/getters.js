// export const myGetter = (state)=>{
    //return state

// }

export const currentState = (state)=>{
return state.status
}


export const currentUser = (state)=>{
    return state.user;
}
export const username = (state)=>{
    return state.user.name || '' ;
}