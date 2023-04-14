import axios from 'axios';

class ChampionsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/champions`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getChampionsUser() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getOneChampion(championId) {
    return this.api.get(`/${championId}`).then(({ data }) => data).catch(err => console.error(err));
  }

  editUserRequest(championId,body) {
    return this.api.put(`/user-request/${championId}`,body).then(({ data }) => data).catch(err => console.error(err));
  }

  editStatus(championId,body) {
    return this.api.put(`/status/${championId}`,body).then(({ data }) => data).catch(err => console.error(err));
  }

  classificationChampions(championId,body) {
    return this.api.put(`/classification/${championId}`,body).then(({ data }) => data).catch(err => console.error(err));
  }

  createChampions(body) {
    return this.api.post('/',body).then(({ data }) => data).catch(err => console.error(err));
  }

  deleteChampions(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
  }
}

const championsService = new ChampionsService();

export default championsService;
