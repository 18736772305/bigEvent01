// ================= ajax获取类别的数据 ===================
function getAtCate(){
  axios.get('/my/article/cates').then((res)=>{
    // console.log(res);
    // 将模板 和 数据结合起来
    let htmlStr = template('trTpl',res.data)
    $('tbody').html(htmlStr)
  })
}
getAtCate()


// ================== 添加分类 ================
let index;// 定义全局变量为后面使用
$('#addBtn').click(function(){
  // console.log(1);
    index = layer.open({
    type:1,// 页面层 没有确定和取消按钮
    title:'添加分类信息',
    area:'500px',// 定义宽,高度有内容撑开
    content: $('#addFormTpl').html()// 内容
  });
})


// === 使用事件代理(事件委托)注册form表单的事件
$('body').on('submit','#addForm',function(e){
  e.preventDefault()
  let data = $(this).serialize()
  // console.log(data);
  axios.post('/my/article/addcates',data).then((res)=>{
    if (res.data.status!==0) {
      // 失败
      return layer.msg('新增文章分类失败')
    }
    // 成功
    // 1,成功弹窗提示
    layer.msg('新增文章分类成功')
    // 2.关闭弹出层
    layer.close(index)
    // 3.重新发送ajax请求重绘页面
    getAtCate()
  })
})
// ============== 编辑功能 ===============
let form = layui.form
let editIndex; // 存储编辑弹出层功能
$('tbody').on('click','.editBtn',function(){
  // 获取当前按钮上自定义属性存储的id的值
  let id = $(this).attr('data-id')
  // console.log(id);

  axios.get('/my/article/cates/' + id).then((res)=>{
    // console.log(res);
    // 填充表单数据
    form.val('editForm',res.data.data)
  })
  editIndex = layer.open({
    type:1,// 页面层 没有确定和取消按钮
    title:'编辑分类信息',
    area:'500px',// 定义宽,高度有内容撑开
    content: $('#editFormTpl').html()// 内容
  });
})

$('body').on('submit',"#editForm",function(e){
  e.preventDefault()
  // 获取表单数据
  let data = $(this).serialize()
  // 发送axios请求
  axios.post("/my/article/updatecate",data).then((res)=>{
    // console.log(res);
    // 1.弹窗提示
    if (res.data.status!==0) {
      return layer.msg('更新失败')
    }
    layer.msg('更新成功')
    // 2.关闭弹窗
    layer.close(editIndex)
    // 重新绘制刷新数据
    getAtCate()
  })
})

// ======== 删除数据 ==========
$('tbody').on('click','.delBtn',function(){
  // console.log(1);
  let id = $(this).attr('data-id') //获取自定义属性id值 this指delBtn
  layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
    //do something 点击了确认按钮
    axios.get('/my/article/deletecate/' + id).then((res)=>{
      // console.log(res);
      if(res.data.status!==0){
        return layer.msg('删除文章分类失败')
      }
      //成功关闭弹窗
      layer.close(index);
      // 发ajax请求重新获取数据刷新页面
      getAtCate()
    })
  });
})
