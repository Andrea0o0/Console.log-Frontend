import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/auth`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  signup(body) {
    return this.api.post('/signup', body).then(({ data }) => data);
  }

  login(user) {
    return this.api.post('/login', user).then(({ data }) => data);
  }

  loginGitHub(id) {
    return this.api.get(`/github/${id}`).then((response) => response.data);
  } 

  loginGoogle(user) {
    return this.api.post('/google', user).then(({ data }) => data);
  }

  edit_username(username) {
    return this.api.post('/username', username).then(({ data }) => data);
  }

  edit_image(image) {
    return this.api.post('/image', image).then(({ data }) => data);
  }

  user() {
    return this.api.get('/user').then((response) => response.data);
  }

  me() {
    return this.api.get('/me').then((response) => response.data);
  }
}

const authService = new AuthService();

export default authService;
