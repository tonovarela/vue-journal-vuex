import journalApi from '@/api/journalApi'


export const loadEntries = async({commit})=>{
      const  {data}=  await journalApi.get('entries.json');
      if (!data){
        commit('setEntries', []);      
        return ;  
      }

      const entries = [];
      for(let id   of Object.keys(data)){
          entries.push( {id, ...data[id]});          
      }
      //console.log(entries);
      commit('setEntries', entries);      

}

export const updateEntry = async({commit},entry)=>{
    const { date, picture,text} = entry;
    const dataToSave = { date, picture,text};
    await journalApi.put(`entries/${entry.id}.json`, dataToSave);
    dataToSave.id =entry.id;
    commit('updateEntry',{...dataToSave});
}

export const createEntry = async({commit},entry)=>{
    const { date, picture,text} = entry;
    const dataToSave = { date, picture,text};
    const e =await journalApi.post(`entries.json`, dataToSave);
    const id =e.data.name;
    entry.id=id;
    commit('addEntry',{...entry});
}

export const deleteEntry = async({commit},id)=> {        
    await journalApi.delete(`entries/${id}.json`);
    commit('deleteEntry',id);
    
}