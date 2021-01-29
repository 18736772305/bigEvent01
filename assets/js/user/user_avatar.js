 // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// ---------------  创建剪裁区 ------------------
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// -------------  点击  上传  ，可以选择图片  ------------
$('#upBtn').on('click', function (e) {
  e.preventDefault()
  $('#file').click()
  // console.log(e);
})

// --------------  更换剪裁区的图片 ---------------
$('#file').change(function () { // 获取文件域的状态
  // console.log('选中的状态改变了');
  // 找到选择的图片
  // console.dir(this.files);
  // console.log(this.files[0]);
  let fileObj = this.files[0]
  // 如果file不存在,用户没有选择图片,后续操作就不执行
  if (!fileObj) {
    return
  }
  // 根据文件对象,生成一个临时的url,用于访问被选择的图片
  let url = URL.createObjectURL(fileObj);
  // console.log(url);

  // 3. 更换剪裁区的图片的src属性
  // - 销毁原理的剪裁区
  // - 更换图片
  // - 重新创建剪裁区
  $image.cropper('destroy')//销毁旧的裁剪区域
  .attr('src', url)// 重新设置图片路径
  .cropper(options);// 重新初始化裁剪区域
})
// ---------------  点击 确定 的时候，剪裁图片，转成base64格式，提交字符串到接口 ----------
$('#sure').click(function () {
  // 剪裁得到一张图片（canvas图片）
  let i = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 100,
    height: 100
  });

  // 把图片转为base64格式
  let str = i.toDataURL() // 把canvas图片转为base64格式
  // console.log(str);
  // axios.post("/my/update/avatar", "查询字符串格式的数据");
    // 以下写法错误，原因在于base64里面含有特殊符号，查找查找字符串的格式有问题，需要将dataURL的值进行编码处理
    /* axios.post("/my/update/avatar", "avatar=" + dataURL).then((res) => {
      console.log(res);
    }); */
  axios.post('/my/update/avatar','avatar=' + encodeURIComponent(str)).then((res)=>{
    // console.log(res);
    if(res.data.status!==0){ // 如果失败提示
      return layer.msg(res.data.message)
    }
    // 成功的提示
    layer.msg(res.data.message)
    // 成功后要同步上面两个用户的头像
    // console.log(window.parent);// 找到<iframe>的父亲window,里面有写好的getUserInfo()方法重新调用绘制用户头像信息
    window.parent.getUserInfo()
  })

})

