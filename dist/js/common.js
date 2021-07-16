var common = {
  loading: 0,
  showError: false,
  local: false,
  state: 100,
  init() {
    //this.isLogin();
    //this.checkToken();
  },

  //判断是否登陆
  isLogin() {
    var that = this;
    var token = this.getLoginToken();
    if (token == '') {
      // 未登录
      // window.location.href = '/login.html';
      return;
    } else {
      this.commonAjax('post', apiUrl.checkToken, { token: token }, function (res) {
        if (meta.code == 200) {
          console.log("后端已经接收数据");
          that.setStorageItem('login_token', res.Result.Token);
          $("body").load("main.html");
        } else {
          //token失效
          // window.location.href = '/login.html';
          return;
        }
      })
    }
  },

  //跳回登陆
  backToLogin() {
    localStorage.removeItem('login_token');
    localStorage.removeItem('user_info');
    localStorage.removeItem('current_module');
    //window.href.reload();
    window.location.href = '/';
  },

  //跳回登陆
  backLogin() {
    localStorage.removeItem('login_token');
    localStorage.removeItem('user_info');
    localStorage.removeItem('current_module');
    //window.href.reload();
    window.location.href = '/';
  },

  //检查token失效
  checkToken() {
    var that = this;
    var token = that.getLoginToken();
    var checkTokenTimer = setInterval(() => {
      that.commonAjax('post', apiUrl.checkToken, { token: token }, function (res) {
        if (res.ErrCode == 0) {
          that.setStorageItem('login_token', res.Result.Token);
          $("body").load("main.html");
        } else {
          //token失效
          clearInterval(checkTokenTimer);
          // 未登录
          // window.location.href = '/login.html';
          $("#links").load("/Main_Page #p-Getting-Started li");
          return;
        }
      });
    }, 60000);
  },

  //获取用户信息
  getUserInfo() {
    return this.getStorageItem('user_info');
  },
    
  //获取公司id
  getCompanyId() {
    var userInfo = this.getUserInfo();
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      return userInfo.CompanyId;
    }
    
    return '';
  },

  //获取登陆token
  getLoginToken() {
    var token = this.getStorageItem('login_token');
    if (typeof token != 'undefined' && token) {
      return token;
    }
    return '';
  },
     
  setStorageItem(key, value) {
    localStorage.setItem(key, value);
  },
  
  getStorageItem(key) {
    return localStorage.getItem(key);
  },

  //ajax method
  commonAjax(methodType, url, postData, callback) {
    var that = this;
    that.showError = true;
    if (typeof ii == 'undefined' && this.loading == 0) { 
      this.loading = 1;
      var ii = layer.load(1);
      var closeLayerLoading = setTimeout(function() {
        layer.close(ii);
        clearTimeout(closeLayerLoading);
        that.loading = 0;
      }, 5000);
    }

    $.ajax({
      url: url,
      method: methodType,
      data: methodType == 'get' ? '' : JSON.stringify(postData),
      headers: {
        "Authorization": that.getLoginToken()
      },
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      success: callback,
      beforeSend: function () {
        // toastr.info('加载中...');
      },
      complete: function (xhr, state, error) {
        that.loading = 0;
        layer.close(ii);

        if (typeof xhr.responseJSON != 'undefined' && typeof xhr.responseJSON.ErrCode != 'undefined') {
          var errorCode = xhr.responseJSON.ErrCode;
          if (errorCode == 401) {
            that.backToLogin();
          } else if (errorCode != 0) {
            if (that.showError) {
              toastr.error(xhr.responseJSON.ErrMsg);
            }
          }
        } else if (typeof xhr.responseJSON != 'undefined' && typeof xhr.responseJSON.meta != 'undefined') {
          var errorCode = xhr.responseJSON.meta.code;
          if (errorCode == 401) {
            that.backToLogin();
          } else if (errorCode != 200) {
            if (that.showError) {
              toastr.error(xhr.responseJSON.meta.message);
            }
          }
        }
        that.showError = false;
      },
      error: function (xhr, state, error) {
        if (state == 'error' && that.showError) {
          toastr.error('网络错误');
        }      

      },
    });
  },

  //上传文件
  uploadFile(url, fileElement, otherParams, callback) {
    let that = this;
    let fd = new FormData();
    if (typeof otherParams != 'undefined' && otherParams.length > 0) {
      for (let i = 0; i < otherParams.length; i++) {
        fd.append(otherParams[i].param, otherParams[i].value);
      }
    }
    let file = $('#' + fileElement).get(0).files[0];

    if (typeof file == 'undefined') {
      toastr.error('未上传文件');
      return false;
    }

    let fileAllow = $('#' + fileElement).data('allow');
    if (file.type && fileAllow) {
      let typeArr = file.type.split('/');
      fileAllow = fileAllow.split(',');

      if (typeArr.length > 1 && fileAllow.indexOf(typeArr[1]) == -1) {
        //toastr.error('不支持文件类型');
        //return false;
      }
    }

    //判断文件大小
    let fileSize = $('#' + fileElement).data('size');
    if (typeof fileSize != 'undefined' && fileSize && fileSize * 1024 < file.size) {
      toastr.error('超过规定文件大小')
      return false;
    }

    fd.append('file', file);

    $.ajax({
      url: url,
      method: 'post',
      cache: false,
      processData: false,
      contentType: false,
      data: fd,
      headers: {
        "Authorization": that.getLoginToken()
      },
      success: callback
    });
  },

    //显示modal
    showModal(el) {
      $('#' + el).modal('show');
    },

    //隐藏modal
    hideModal(el) {
      $('#' + el).modal('hide');
    },
    
    changeElementText(element, text) {
      $(element).text(text)
    },
    
    //表格信息
    initTable(el, option) {
      var defaultOption = {
          "responsive": true,
          "autoWidth": true,
          "searching": true,
          "aLengthMenu": [10, 25, 50, 100, 300, 500, 1000],
          "language": {
            "lengthMenu": "每页 _MENU_ 条记录",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "sSearch": "搜索：",
            "oPaginate": {
              "sFirst": "首页",
              "sPrevious": "上页",
              "sNext": "下页",
              "sLast": "末页"
            },
          }
      };
      if (option) {
        Object.getOwnPropertyNames(option).forEach(function(key) {
          defaultOption[key] = option[key];
        });
      }
      return $('#' + el).DataTable(defaultOption);
    },
    //表格信息
    initBasicsTable(el) {
      var defaultOption = {
        "responsive": true,
        "autoWidth": true, 
        "searching": false,
        "aLengthMenu": false,
        "bLengthChange": false,
        "bProcessing" :false,
        "bPaginate": false,
        "bInfo":false,
          "language": {
            "zeroRecords": "没有找到记录",
            "infoEmpty": "无记录",
          }
      };
      return $('#' + el).DataTable(defaultOption);
    },
    //解析箱格
    parseBox(size) {
      var parseStr = '';
      switch(size) {
        case 'A':
          parseStr = '极大';
          break;
        case 'B':
          parseStr = '大';
          break;
        case 'C':
          parseStr = '中';
          break;
        case 'D':
          parseStr = '小';
          break;
        case 'E':
          parseStr = '极小';
          break;  
      }

      return parseStr;
    },

    //url参数
    urlParam(data) {
      var url = '';
      if (typeof data == 'object') {
        for(var i in data) {
          url += i + '=' + data[i] + '&';
        }
      }
      url = url.trim('&');
      return url;
    },

    //删除空节点
    deleteEmptyNode(data, nodeName) {
      var node = 'nodes';
      if (nodeName) node = nodeName;

      data.forEach(e => {
        if (e[node].length == 0) {
          delete e[node];
        }

        e.nodes && this.deleteEmptyNode(e[node]);
      });

      return data;
    },
};

