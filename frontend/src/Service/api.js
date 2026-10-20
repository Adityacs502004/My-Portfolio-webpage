import axios from 'axios'

const Api = axios.create({
    baseURL : 'http://localhost:3000',
    timeout : 30000,
    withCredentials : true ,
    headers : {
        'Accept' : 'application/json'
    }
})

export default Api