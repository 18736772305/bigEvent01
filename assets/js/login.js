
;$(function(){
// 注册账号
  $('#gotoRegi').on('click',function(){
    // 显示注册界面
    $('.regiBox').show()
    // 隐藏登录界面
    $('.loginBox').hide()
  })
  // 去登录
  $('#gotoLogin').on('click',function(){
    // 显示注册界面
    $('.regiBox').hide()
    // 隐藏登录界面
    $('.loginBox').show()
  })


  // 表示从layUI中1获取相关功能(表单密码验证)
  let form = layui.form;
  // 密码验证
  form.verify({
    repass:function(value,item){
      // console.log(value);
      let pwd = $('.regiBox [name=password]').val()
      // console.log(pwd);
      if(value !== pwd){
        return '两次密码输入不一致'
      }
    }
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    ,pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
  });      

})
















