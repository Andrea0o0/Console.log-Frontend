import axios from 'axios';

class KataService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/kata`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getKatas() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getOneKata(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
  }

  editKata(id,body) {
    return this.api.put(`/${id}`,body).then(({ data }) => data).catch(err => console.error(err));
  }

  createKata(body) {
    return this.api.post('/',body).then(({ data }) => data).catch(err => console.error(err));
  }

  deleteKata(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
  }



}

const kataService = new KataService();

export default kataService;
