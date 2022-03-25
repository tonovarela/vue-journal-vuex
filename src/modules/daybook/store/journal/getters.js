// export const myGetter = (state)=>{
    //return state

// }

export const getEntriesByTerm = ( state ) => (term='') => {    
    if (term.length===0) return state.entries;
    return state.entries.filter(e=>e.text.toLowerCase().includes(term.toLowerCase()))

}


export const getEntriesById = (state )=> (id='') =>{
    const entry= state.entries.find(e=>e.id===id);    
    if(!entry) return;
    return {...entry};

}