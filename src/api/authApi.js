import axios from 'axios'

const authAPI = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: { key: 'AIzaSyB3K1IwCMz09b9DEzz9I3K6XKj0dcZhH8U' }
})


export default authAPI;