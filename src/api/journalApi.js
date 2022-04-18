import axios from 'axios'

const journalAPI = axios.create({
    baseURL:'https://vue-demos-77094-default-rtdb.firebaseio.com'
})


journalAPI.interceptors.request.use((config)=>{
    config.params ={
        auth:localStorage.getItem('idToken')
    }
    return config;
})
//console.log(process.env.NODE_ENV);
export default journalAPI;