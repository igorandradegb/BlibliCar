import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = {...axios.create({})}
  Vue.prototype.$axios.defaults.baseURL = 'localhost:3000'
}

// export {axiosInstance}
