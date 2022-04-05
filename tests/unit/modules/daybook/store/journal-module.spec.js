const { createStore } = require("vuex");
import  journal  from  '@/modules/daybook/store/journal';
import { journalState } from '../../../mock-data/test-journal-state';



const createVuexStore =(inicialState)=>createStore({
    modules:{
        journal:{
             ...journal,
             state: { ...inicialState}
        }
    }
});

describe('Vuex pruebas en el Journal Module',()=>{
   //Basicas
     test('Verifica el state por medio del estado inicial',()=>{        
         const store = createVuexStore(journalState);          
         const  {isLoading, entries} = store.state.journal;
         expect(isLoading).toBeFalsy();
         expect(entries).toEqual(journalState.entries);    
     })
     //mutations
     test('mutations: setEntries',()=>{
         const store = createVuexStore({isLoading:true, entries:[]});
         store.commit('journal/setEntries',journalState.entries)
         expect(store.state.journal.entries.length).toBe(3);
         expect(store.state.journal.isLoading).toBeFalsy();
     });

     
     test('mutations: updateEntry',()=>{
        const store = createVuexStore(journalState);          
        const updateEntry = {
                id: "-Mz2XELbKHLiTt97ay2g",
                date: 1648252992582,
                picture: "https://res.cloudinary.com/duphx2ezk/image/upload/v1648253006/cb9rzvjlw2krjwg3rioc.png",
                text: "Lo estamos cambiando"
            }

            //commit de la mutation
            store.commit('journal/updateEntry',updateEntry);
            const storeEntries =store.state.journal.entries;            
            expect(storeEntries.length).toBe(3);
            expect(storeEntries.find(e=>e.id==updateEntry.id)).toEqual(updateEntry);                                            
     })

     test('mutations: addEntry y delete entry',()=>{
        const store = createVuexStore(journalState);          
        const newEntry = {
            id: "newEntry",
            date: 1648252992582,
            picture: "https://res.cloudinary.com/duphx2ezk/image/upload/v1648253006/cb9rzvjlw2krjwg3rioc.png",
            text: "Lo estamos agregando"
        }

            //commit de la mutation
            store.commit('journal/addEntry',newEntry);
            const storeEntries =store.state.journal.entries;            
            expect(storeEntries.find(e=>e.id==newEntry.id)).toEqual(newEntry);
            
            store.commit('journal/deleteEntry',newEntry.id);            
            expect(store.state.journal.entries.find(e=>e.id==newEntry.id)).toBeUndefined();
            
     })

     test('Getters: getentriesByTerm getEntrybyId',()=>{
        const store = createVuexStore(journalState); 

         //console.log(journalState.entries);
        const  [entry1, entry2] = journalState.entries;
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(3)
        expect(store.getters['journal/getEntriesByTerm']('Hola').length).toBe(1)        
        expect(store.getters['journal/getEntriesByTerm']('Hola')).toEqual([entry1]);         
        expect(store.getters['journal/getEntriesById']('-Mz2XELbKHLiTt97ay8g')).toEqual(entry1);
     })

     test('Actios : loadEntries',async()=>{

        const store = createVuexStore({isLoading:true, entries:[]});
        
         await store.dispatch('journal/loadEntries')
        //expect(store.state.journal.entries.length).toBe(3)
     });

     test('Actions : updateEntry',async()=>{
        const store = createVuexStore(journalState);        
        const updatedEntry = 
            {
                id: "-Mz2XELbKHLiTt97ay8g",
                date: 1648252992582,
                masInfo: {info:"Varela"},
                picture: "https://res.cloudinary.com/duphx2ezk/image/upload/v1648253006/cb9rzvjlw2krjwg3rioc.png",
                text: "Estos son cambios desde pruebas"
            };
        
         await store.dispatch('journal/updateEntry',updatedEntry)                  
         expect(store.state.journal.entries.find(e=>e.id===updatedEntry.id)).toEqual({
            id: "-Mz2XELbKHLiTt97ay8g",
            date: 1648252992582,
            picture: "https://res.cloudinary.com/duphx2ezk/image/upload/v1648253006/cb9rzvjlw2krjwg3rioc.png",
            text: "Estos son cambios desde pruebas"
         })
     });

     test('Actions : createEntry y delete entry',async()=>{
        const store = createVuexStore(journalState);        
        const newEntry = 
            {                
                date: 1648252992582,             
                picture: "https://res.cloudinary.com/duphx2ezk/image/upload/v1648253006/cb9rzvjlw2krjwg3rioc.png",
                text: "Otra entracccccda"
            };
        
        await store.dispatch('journal/createEntry',newEntry);
        
         const [entry]  = store.state.journal.entries;
         console.log(entry);
          expect(store.state.journal.entries.find(e=>e.id===entry.id)).toEqual(entry);

        await store.dispatch('journal/deleteEntry',entry.id);
        expect(store.state.journal.entries.find(e=>e.id===entry.id)).toBeUndefined();
     });

});