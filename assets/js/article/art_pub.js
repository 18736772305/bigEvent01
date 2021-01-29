$(function () {
  let form = layui.form
  // 初始化富文本编辑器
  initEditor()

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // =============== 获取分类数据 ===================
  axios.get('/my/article/cates').then((res) => {
    // console.log(res);
    res.data.data.forEach(item => {
      // console.log(item);
      $(`<option value="${item.Id}">${item.name}</option>`).appendTo($('#select'))
    });
    // 重新渲染表单
    form.render(); //更新全部
  })
  // =========== 更新图片 ==============
  $('#upData').click(function () {
    $('#file').click()
  })
  // ============== 文件域的change事件 ===========
  $('#file').on('change', function () {
    // 选择的图片
    let file = this.files[0]
    console.log(file);
    // 如果每有选择图片
    if (!file) {
      return
    }
    let newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域


  })

  // 定义该文章是发布还是存为草稿
  let state  // 文章的状态
  $('#btn1').click(function(){
    state = '已发布'
  })
  $('#btn2').click(function(){
    state = '草稿'
  })

  // ============= 发布文章 ===============
  $('form').on('submit', function (e) {
    e.preventDefault()
    // 收集form表单中的数据
    // let data = $(this).serialize()
    // console.log(data);

    // 封面数据


    // 状态(已发布,草稿)
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob((blob) =>{       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 通过FormData来收集数据 ==> 需要用箭头函数来解决this的指向问题
        let fd = new FormData(this)
        // fd 只收集了title,content,cate_id的值还有cover_img,state的值没有收集到
        // 利用append追加给FormData
        fd.append("cover_img",blob)
        fd.append("state",state)
        // 查看FormData收集的数据
        // fd.forEach((value,key)=>{
        //   console.log(value,key);
        // })
        // console.log(blob);
        // console.log(state);
        axios.post('/my/article/add',fd).then((res)=>{
          console.log(res);
          if (res.data.status!==0) {
            return layer.msg('发布失败')
          }
          layer.msg('发布成功!')
          location.href = '/article/art_list.html'
        })
      })
  })
})