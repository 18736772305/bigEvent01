$(function () {
  let form = layui.form
  let laypage = layui.laypage;
  // 定义查询参数
  const query = {
    pagenum: 1, // 是	int	页码值
    pagesize: 2, // 是	int	每页显示多少条数据
    cate_id: "", // "" 所有的文章分类 否	string	文章分类的 Id
    state: "", // "" 所有状态 文章状态  可选值有：已发布、草稿
  };
  //补零函数
  function addZero(n) {
    return n < 10 ? "0" + n : n
  }
  // 过滤器时间处理函数
  template.defaults.imports.formatTime = function (time) {
    let d = new Date(time)
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let day = d.getDate()

    let h = d.getHours()
    let min = d.getMinutes()
    let s = d.getSeconds()
    return `${y}/${m}/${addZero(day)}  ${addZero(h)}:${addZero(min)}:${addZero(s)}`
  }

  getList()
  function getList() {
    axios.get('/my/article/list', {
      // 发送的数据
      // `params` 是即将与请求一起发送的 URL 参数
      params: query,
    }).then((res) => {
      // console.log(res);
      // 渲染tr
      let htmlStr = template("trTpl", res.data)
      // // console.log(htmlStr);
      $('#tb').html(htmlStr)
      //处理分页 ==> 把总页数传递给该函数
      renderPage(res.data.total)
    })
  }
  function renderPage(total) {
    //分页效果
    //执行一个laypage实例
    laypage.render({
      // prev,
      limits: [1, 2, 3, 5, 8],
      elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
      , count: total //数据总数，从服务端得到
      , curr: query.pagenum //起始页,从query对象中
      , limit: query.pagesize
      , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
      , jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        // 1.点击分页加载对应query对象的pagenum页码值
        // 2.发送ajax请求获取数据
        query.pagenum = obj.curr
        // console.log(obj.limit);
        // pagesize 每页显示几条数据
        query.pagesize = obj.limit
        // console.log(obj.curr);
        // console.log(query);
        // 第一种情况,laypage.render初始化渲染分页的时候就会触发一次 first为true
        // 第二种情况,点击分页切换的时候也会触发first为undefined
        // console.log(first);
        //首次不执行
        if (!first) {
          getList()
        }
      }
    });
  }

  // 获取分类数据
  axios.get("/my/article/cates").then((res) => {
    // console.log(res);
    res.data.data.forEach(function (item) {
      $(`<option value="${item.Id}">${item.name}</option>`).appendTo($('#allSelects'))
    })
    form.render(); //更新全部
  })

  // 实现筛选功能
  $('#form').on('submit', function (e) {
    e.preventDefault()
    // console.log(1);
    query.cate_id = $('#allSelects').val()
    query.state = $('#stateSelect').val()
    // 筛选出的数据在第一页来查看
    query.pagenum = 1
    getList()

  })

  // ============  删除功能 =============
  $('#tb').on('click', '.delBtn', function () {
    let id = $(this).attr('data-id') //获取当前要删除的id
    // console.log(del);
    layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      if ($('.delBtn').length === 1) {
        //如果当前页删除按钮的个数为1就展示上一页数据
        // if (query.pagenum === 1) {
        //   query.pagenum = 1
        // }else{
        //   query.pagesize = query.pagesize-1
        // }
        //简化三元运算符运算
        query.pagenum = query.pagenum === 1 ? 1 : query.pagenum - 1
      }
      // 点击确认按钮发送ajax请求删除数据
      axios.get('/my/article/delete/' + id).then((res) => {
        // console.log(res);
        if (res.data.status !== 0) {
          return layer.msg('删除文章失败')
        }
        layer.msg('删除成功')
        getList()//删除成功重绘页面
      })
      layer.close(index);
    });

  })
  

})