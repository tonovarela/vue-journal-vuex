import {computed, ref} from "vue";
const {useStore} = require("vuex")

const useAuth = () => {

    const store = useStore();
    const createUser = async (user) => {

        const resp = await store.dispatch('auth/createUser', user);
        return resp;
    }

    const loginUser = async (user) => {
        const resp = await store.dispatch('auth/signInUser', user);
        return resp

    }

    const checkAuthStatus = async () => {
        const resp = await store.dispatch('auth/checkAuthentication')
        return resp;
    }

    

    const logOut = ()=>{
        store.commit('auth/logOut');   
        store.commit('journal/clearEntries');   
    }



    return {
        createUser,        
        logOut,
        loginUser,
        checkAuthStatus,
        userName:computed(()=>store.getters["auth/username"]),
        authStatus: computed(()=>store.getters["auth/currentState"])
    }
}


export default useAuth;