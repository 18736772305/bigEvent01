 // 设置根路径
 axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net';



 // 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
  // 在发送请求之前做些什么  
  // config 是配置对象
  if(config.url.indexOf('/my') !== -1){
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// // 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response);
  if (response.data.status === 1 && response.data.message == '登录失败!') {
    // 用户的身份认证失败
    localStorage.removeItem('token')
    // 需要把页面跳转回到login登录页面
    location.href = '/home/login.html'

  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
