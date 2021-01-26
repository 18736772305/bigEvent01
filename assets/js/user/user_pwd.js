$(function () {
  // ============ 添加表单的自定义校验规则 ============
  let form = layui.form
  form.verify({
    // 对新密码校验
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    newPwd: function (value) {
      // console.log(value);
      // 获取原密码,和新密码进行比较 ,如果两者是相同,需要提示
      let oldPwd = $('[name=oldPwd]').val()
       
      if (oldPwd === value) {
        return '两次密码不能相同'
      }
    },
    // 确认新密码的校验
    reNewPwd:function(value){
      let newPwd = $('[name=newPwd]').val()
      if (newPwd!==value) {
        return '两次密码不相同'
      }

    }
  })
  // ================== 发ajax请求更换密码 ===============

  $('form').on('submit',function(e){
    e.preventDefault() // 阻住默认提交
    let data = $(this).serialize() // 收集form表单收集的数据
    axios.post('/my/updatepwd',data).then(function(res){
      console.log(res);
      if (res.data.status!==0) { //判断如果原密码错误返回的结果
       return layer.msg(res.data.message)
      }
      layer.msg('修改密码成功',function(){
        $('form input').val('')
        // 密码修改成功退出重新登录
        window.parent.location.href = '/home/index.html'
        localStorage.removeItem('token')
      })
    })
  })
})