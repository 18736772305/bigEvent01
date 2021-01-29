// 发送ajax请求获取用户信息
//============================== 发送ajax请求获取用户信息 ========================
function getUserInfo() {
  axios.get('/my/userinfo',{
    //  headers: {
    //     Authorization: localStorage.getItem("token"),
    //   }, 
  }).then((res) => {
    // console.log(res);
    if(res.data.status !== 0 ){
      // 说明获取失败
      return layer.msg('获取用户信息失败')
    }
    // 获取用户信息成功 ==> 处理头像昵称
    // console.log(res.data);
    avatarAndName(res.data)
  })
  // axios({
  //   url:'/my/userinfo',
  //   headers:{
  //     Authorization: localStorage.getItem('token')
  //   }
  // }).then((res)=>{console.log(res);})
}
getUserInfo()
// ============================ 处理头像和昵称 ============================
function avatarAndName(res){
  // ==> 处理头像和昵称
  // console.log(res);
  // 处理名字优先展示nickname
  let name = res.data.nickname || res.data.username
  // 修改名字
  $('#welcome').text('欢迎 '+name)
  // 处理头像
  if (res.data.user_pic) { // 如果头像的值不为空就是有上传头像
    // 如果有上传头像则显示上传的头像,没有就显示文字头像
    $('.layui-nav-img').attr('src',res.data.user_pic).show()
    $('.text_avatar').hide()
  }else{
    // 如果没有上传头像则显示文字的头像,
    let first = name[0].toUpperCase()
    $('.text_avatar').text(first).show()
    // $('.layui-nav-img').hide()
  }
}
// ============================== 退出 ==============================
$('#logoutBtn').on('click',function(){
  // 弹窗提示是否退出
  layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
    // 退出要做的事
    // 将本地存储的token删除掉
    localStorage.removeItem('token')
    // 跳转页面
    location.href = '/home/login.html'
    layer.close(index);
  });
})







