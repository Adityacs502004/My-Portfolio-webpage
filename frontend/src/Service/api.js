import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL
    || `${window.location.protocol}//${window.location.hostname}:3000`

const Api = axios.create({
    baseURL : apiBaseUrl,
    timeout : 30000,
    headers : {
        'Accept' : 'application/json'
    }
})

export default Api