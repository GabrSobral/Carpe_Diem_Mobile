import axios from 'axios'
import { getToken } from '../utils/handleToken';

const api = axios.create({
  baseURL: 'https://carpe-diem-api.herokuapp.com'
})

const token = getToken();

api.interceptors.request.use(async config => {
  if (token) {
    if(!config.headers.Authorization){
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config
})

export { api }