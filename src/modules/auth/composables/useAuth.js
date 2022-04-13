const { useStore } = require("vuex")

const useAuth =()=>{

     const store =useStore();
     const createUser = async(user) => {
         console.log(user);
         const resp = await store.dispatch('auth/createUser',user);
         //Dispatch  //crear usuario
         return  resp;
     }
     return {
      createUser   
     }
}

export default useAuth;