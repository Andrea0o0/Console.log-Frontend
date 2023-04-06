import axios from 'axios';

class SolutionService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/solutions`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getSolutionsUser() {
    return this.api.get('/user').then(({ data }) => data).catch(err => console.error(err));
  }

  getSolutionsUserKata(id) {
    return this.api.get(`/user/${id}`).then(({ data }) => data).catch(err => console.error(err));
  }

  getSolutionsKata(id) {
    return this.api.get(`/kata/${id}`).then(({ data }) => data).catch(err => console.error(err));
  }

  getSolutionRefactor(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
  }

  editSolutionIncompleted(id,body) {
    return this.api.put(`/${id}`,body).then(({ data }) => data).catch(err => console.error(err));
  }

  createSolution(body) {
    return this.api.post('/',body).then(({ data }) => data).catch(err => console.error(err));
  }

  deleteSolution(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
  }
}

const solutionService = new SolutionService();

export default solutionService;
