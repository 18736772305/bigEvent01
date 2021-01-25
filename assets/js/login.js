
; $(function () {
  // 注册账号
  $('#gotoRegi').on('click', function () {
    // 显示注册界面
    $('.regiBox').show()
    // 隐藏登录界面
    $('.loginBox').hide()
  })
  // 去登录
  $('#gotoLogin').on('click', function () {
    // 显示注册界面
    $('.regiBox').hide()
    // 隐藏登录界面
    $('.loginBox').show()
  })


  // 表示从layUI中1获取相关功能(表单密码验证)
  let form = layui.form;
  // 密码验证
  form.verify({
    repass: function (value, item) {
      // console.log(value);
      let pwd = $('.regiBox [name=password]').val()
      // console.log(pwd);
      if (value !== pwd) {
        return '两次密码输入不一致'
      }
    }
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    , pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ]
  });

  //==========================  注册 =========================


  // $('.regiBox form').on('submit',function(e){
  //   e.preventDefault()
  //   let data = $(this).serialize()

  //   // 发送ajax请求
  //   axios.post('http://api-breakingnews-web.itheima.net/api/reguser',data).then((res)=>{
  //     // console.log(res);
  //     if(res.data.status !== 0 ){
  //       return layer.msg(res.data.message)
  //     }else{
  //       layer.msg('注册成功! 请登录')
  //       // 展示登陆界面 模拟点击
  //       $('#gotoLogin').click()
  //     }

  //   })
  // })

  $('.regiBox form').on('submit', function (e) {
    e.preventDefault()
    // console.log($(this).serialize());
    let data = $(this).serialize() // 拿到form表单里面的name属性的值
    axios.post('/api/reguser', data).then((res) => {
      console.log(res);
      if (res.data.status === 1) {
        return layer.msg(res.data.message)
      } else {
        layer.msg('注册成功!')
        $('#gotoLogin').click()
      }
    })
  })
  //========================== 登录 ============================

  $('.loginBox form').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    axios.post('/api/login', data).then(function (res) {
      console.log(res);
      // layer.msg(res.data.message+'账号或密码错误')
      if (res.data.status !== 0) {    // 登录失败
        // console.log(1111);
        return layer.msg(res.data.message + '账号或密码错误')
      }
      //登陆成功
      layer.msg('登录成功,即将跳转到首页', { time: 2000 }, function () {
        // 跳转页面
        // location.href = '/home/index.html'
      })
      // 需要本地存储====>获取服务器响应回来的token信息(随机码),方便后期使用token
      localStorage.setItem('token', res.data.token)
    })
  })
})




















