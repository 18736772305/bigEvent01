$(function () {
  // ============ 发送ajax请求获取用户的信息 ====================
  let form = layui.form
  function getUserInfo() {
    axios.get("/my/userinfo").then(res => {
      // console.log(res);
      // console.log(res.data.data);
      // 给表单赋值
      // form 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
      form.val("form", res.data.data);
    })
  }
  getUserInfo()
  // ================= 添加自定义校验规则 ===============
  form.verify({
    // 对用户昵称做个长度限制
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度需要在1-6个字符'
      }
    }
  })
  // ================ 实现修改功能 ==================
  // console.log($('#form'));
  $('#form').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()// 收集form表单的值
    axios.post('/my/userinfo',data).then(res=>{
      // console.log(res);
      if(res.data.status!==0){
        // 更新失败
        return layer.msg('修改用户信息失败')
      }
      // 更新成功
      layer.msg('修改用户信息成功!')

      // 子页面是无法获取到父页面index中的元素，也就无法修改其内容
      // console.log($("#welcome"));
      // console.log(window.parent);
      // window.parent ==> 获取的是父页面 index页面的window对象
      // console.log(window.parent);
      window.parent.getUserInfo();
    })
  })
  // ==============  重置功能 ==================
  $('#resetBtn').on('click',function(e){
    e.preventDefault()
    getUserInfo()
  })
})
