//静态内容信息
var pages = {
    'kanban': {
        path: 'kanban',
        code: 'kanban',
        icon: 'fa-tachometer-alt',
        name: '智慧仓库数据看板'
  },
    'basicSetup': {
      path: 'basicSetup',
      code: '',
      icon: '',
      name: '基本设置'
    },
    'changePassword': {
      path: 'changePassword',
      code: '',
      icon: '',
      name: '修改密码'
    },
    'Dkb': {
      path: '',
      code: '',
      icon: 'fa-th',
      name: '数据控制中心'
    },
    'CSceneManage': {
      path: '',
      code: '',
      icon: 'fa-industry',
      name: '控制中心',
      children: {
              
      }
    },
    'CSceneList': {
      path: 'spaceManage',
      code: '',
      icon: '',
      name: '空间管理'
    },
    'CAuthorizationCenter': {
      path: 'authorization',
      code: '',
      icon: '',
      name: '授权管理'
    },
    'CDeviceCenter': {
      path: 'CDeviceCenter',
      code: '',
      icon: '',
      name: '设备中心'
  },
    'CDeviceManage': {
      path: 'deviceManagement',
      code: '',
      icon: '',
      name: '智慧仓管理'
    },
    'CKeyAdmin': {
      path: 'CKeyAdmin',
      code: '',
      icon: '',
      name: '钥匙柜管理'
    },
    'CWarehouseManage': {
      path: 'selfHouse',
      code: '',
      icon: '',
      name: '智慧仓中心'
    },
    'CUserManege': {
      path: '#',
      code: '',
      icon: 'fa-user',
      name: '用户中心',
      children: {
              
      }
    },
    'COrganizeManage': {
      path: 'user',
      code: '',
      icon: '',
      name: '组织管理'
    },
    'CCasualUser': {
      path: 'temporaryUser',
      code: '',
      icon: '',
      name: '临时用户'
    },
    'role': {
      path: 'roleMan',
      code: '',
      icon: '#',
      name: '角色管理'
    },
  
    'CBussines': {
      path: '#',
      code: '',
      icon: 'fa-database',
      name: '业务管理',
      children: {
              
      }
    },
    'CConference': {
      path: 'CConference',
      code: '',
      icon: '',
      name: '会议室预约'
    },
    'CAccess': {
      path: 'CAccess',
      code: '',
      icon: '',
      name: '门禁预约'
    },
    'CTactics': {
      path: 'CTactics',
      code: '',
      icon: '',
      name: '扫码支付业务'
    },
    'CExpress': {
      path: 'CExpress',
      code: '',
      icon: '',
      name: '快递业务'
    },
    'depositBus': {
      path: 'depositBus',
      code: '',
      icon: '',
      name: '寄存业务'
    },
    'CStorage': {
      path: 'CStorage',
      code: '',
      icon: '',
      name: '仓储业务'
    },
    'CBaseStation': {
      path: 'CBaseStation',
      code: '',
      icon: '',
      name: '基站节能'
    },
    'beautySalon': {
      path: 'beautySalon',
      code: '',
      icon: '',
      name: '美容院'
    },
    'warehouse': {
      path: 'warehouseManagement',
      code: '',
      icon: '',
      name: '仓库管理'
    },
    'product': {
      path: 'productManagement',
      code: '',
      icon: '',
      name: '产品管理'
    },
    'stock': {
      path: 'inventoryManagement',
      code: '',
      icon: '',
      name: '库存管理'
    },
    'in-out-stock': {
      path: 'outPutManagement',
      code: '',
      icon: '',
      name: '出入库管理'
    },
    'take-stock': {
      path: 'InvenManagement',
      code: '',
      icon: '',
      name: '盘点管理'
    },
  
    'CPlatformOperate': {
      path: '',
      code: '',
      icon: 'fa-edit',
      name: '平台运营',
      children: {
              
      }
    },
    'CLog': {
      path: 'log',
      code: '',
      icon: '',
      name: '日志管理'
    },
    
    'AccessLog': {
      path: 'accessLog',
      code: '',
      icon: '#',
      name: '门禁记录'
    },
    'message': {
      path: 'message',
      code: '',
      icon: '#',
      name: '消息提醒'
            
    },
    'CkeyBusiness': {
      path: '',
      code: '',
      icon: 'fa-key',
      name: '钥匙柜业务',
      children: {
              
      }
    },
    'CKeyBind': {
      path: 'CKeyBind',
      code: '',
      icon: '',
      name: '钥匙绑定'
    },
    'CKeyAuthorization': {
      path: 'CKeyAuthorization',
      code: '',
      icon: '',
      name: '钥匙授权'
    },
    'CKeyUsageRecord': {
      path: 'CKeyUsageRecord',
      code: '',
      icon: '',
      name: '使用记录'
    },
    'CKeyEquipManage': {
      path: 'CKeyEquipManage',
      code: '',
      icon: '',
      name: '钥匙柜管理'
    },
    'userAuthorization': {
      path: 'userAuthorization',
      code: '',
      icon: '',
      name: '用户授权'
    },
  
    'CCustomer': {
      path: '#',
      code: '',
      icon: 'fa-users',
      name: '客户管理',
      children: {
              
      }
    },
    'CCustomerList': {
      path: 'CCustomerList',
      code: '',
      icon: '',
      name: '客户列表'
    },
    'CProductSales': {
      path: 'CProductSales',
      code: '',
      icon: '',
      name: '产品销售'
    },
    'CMaintain': {
      path: 'CMaintain',
      code: '',
      icon: '',
      name: '客户运维'
    },
  };
  
  var menu = {
    //初始化菜单
    init() {
        let that = this;
        common.commonAjax('get', apiUrl.menu, {}, function (response, xhr, status) {
          console.log(xhr, status)
        if (response.ErrCode == 0) {
            if (response.Result.length > 0) {
                response.Result.forEach(item => {
                    if (item.Children.length > 0) {
                    item.Children.forEach(child => {
                        let childPageInfo = that.getPageInfo(child.FunctionTab);
                        child.pagePath = childPageInfo.path;
                        if (child.pagePath == '') {
                        child.pagePath = '#';
                        }
                        child.icon = childPageInfo.icon;
                    });
                    }

                    let itemPageInfo = that.getPageInfo(item.FunctionTab);
                    item.pagePath = itemPageInfo.path;
                    if (item.pagePath == '') {
                    item.pagePath = '#';
                    }
                    item.icon = itemPageInfo.icon;
                });
            }

            let _html = template('menu_template', { menu: response.Result });
            $('#geeku-menu').html(_html);
            // 修改菜单的样
            $('.has-treeview>ul>.nav-item').on('click', function (e) {
                e.stopPropagation();
            })
                
            // 点击下拉事件
            $('.has-treeview').on('click', function () {
                $(this).siblings().children('ul').stop(true);
                $(this).children("ul").stop(true);
                $('.has-treeview').removeClass('menu-open');
                $(this).siblings().children('ul').slideUp();
                $(this).children("ul").slideToggle();
                $(this).children("a").find("i:eq(1)").toggleClass('down');
                $(this).siblings().children("a").find("i:eq(1)").removeClass('down');
            });
            // 修改菜单的样式
            $('.nav-sidebar>.nav-item>.nav-link').on('click', function () {
            $('.nav-sidebar>.nav-item>.nav-link').css({
                'background': '#3a4046',
                'color': 'rgba(255,255,255,0.4)'
            });
            $(this).css({
                'background': '#51575d',
                'color': '#fff'
            });
            })
            let currentModule = localStorage.getItem('current_module');
            if (currentModule) {
                $('li.menu-open').removeClass('menu-open');
                $('li.nav-item>a.active').removeClass('active');
                $('a[data-page=' + currentModule + ']').addClass('active');
                $('a[data-page=' + currentModule + ']').parent().parent().parent().addClass('menu-open');
                that.changePage(currentModule);
            } else {
            $('ul>li>a.new-page').eq(0).addClass('active');
                that.changePage($('ul>li>a.new-page').eq(0).attr('data-page'));
            }
            $('ul>li>a.new-page').on('click', function (e) {
                if ($(this).hasClass('active')) {
                    //return false;
                }
                $(this).find("hr").hide();
                $(this).parent().siblings().find("hr").show();
                $('ul>li>a.active').removeClass('active');
                // $(this).find("hr").show();
                let page = $(this).attr('data-page');
                $(this).addClass('active');
                that.changePage(page);
                e.preventDefault();
            });
        } else if (response.ErrCode == 401) {
            toastr.error('登录超时');
            common.backToLogin();
        } else {
            toastr.error(response.ErrMsg);
        }
        });
    },

    //获取页面信息
    getPageInfo(page) {
        var info = { path: '#', icon: 'fa-th' };
  
        if (pages.hasOwnProperty(page)) {
          info = pages[page];
        }
        return info;
    },
  
    //手机端关闭弹窗
    closeMenu() {
        $('.sidebar-open').addClass('sidebar-closed sidebar-collapse').removeClass('sidebar-open');
    },
  
    //切换页面
    changePage(page) {
          var that = this;
          let pageInfo = that.getPageInfo(page);
          if (pageInfo.path == '' || pageInfo.path == '#') {
              pageInfo.path = 'pages404';
          }
          let pagePath = '/pages/' + pageInfo.path + '.html';
          common.setStorageItem('current_module', page);
          
          //销毁已有的对象
          if (typeof geeku != 'undefined') {
              geeku = null;
          }
          $('#main-content').html('');

          if (pageInfo.code == 'kanban') {
            window.location.href = '/kanban.html';
            return;
          }
        
          $('#main-content').load(pagePath, function() {
              if ((typeof geeku != 'undefined') 
              && geeku != null && (typeof geeku == 'object') && typeof geeku.init == 'function') {
                  //初始化处理
                  geeku.init();
              }
          });
    },
  }