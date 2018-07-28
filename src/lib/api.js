import axios from "axios";
import router from "../routers/api";

const HOST = "http://localhost:3333/api/v1";

class Api {
  /**/
  constructor() {
    this.http = axios.create();
    this.http.interceptors.response.use(
      ({ data }) => data,
      error => Promise.reject(error)
    );
    /*
    this.http.interceptors.request.use(
      config => {
        console.log(config);
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
        // config.headers.Accept = 'audio/wav, application/json';
        return config;
      },
      error => Promise.reject(error)
    );
    */
  }

  /**
   * GET requested api route by name
   * @param  {String} name
   * @param  {Object} params
   * @param  {Object} query
   * @param  {Object} config
   * @return {Promise}
   */
  get(name, params = {}, query = {}, config = {}) {
    try {
      const route = router.match({ name, params, query });
      // const queryString = Object.keys(query).length ? `?${route.fullPath.split('?')[1]}` : '';
      // return this.http.get(`${route.path}/${queryString}`, config);
      return this.http.get(`${HOST}/${route.path}`, config);
    } catch (e) {
      return Promise.reject("Route Not Found");
    }
  }

  /**
   * POST to requested api route by name
   * @param  {String} name
   * @param  {Object} params
   * @param  {Object} body
   * @param  {Object} config
   * @return {Promise}
   */
  post(name, params = {}, body = {}, query = {}, config = {}) {
    try {
      return this.http.post(
        `${router.match({ name, params, query }).fullPath}/`,
        body,
        config
      );
    } catch (e) {
      return Promise.reject("Route Not Found");
    }
  }

  /**
   * DELETE requested api route by name
   * @param  {String} name
   * @param  {Object} params
   * @param  {Object} query
   * @param  {Object} config
   * @return {Promise}
   */
  delete(name, params = {}, query = {}, config = {}) {
    try {
      return this.http.delete(
        `${router.match({ name, params, query }).fullPath}/`,
        config
      );
    } catch (e) {
      return Promise.reject("Route Not Found");
    }
  }
}

export default new Api();
