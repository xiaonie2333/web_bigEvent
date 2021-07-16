//相关性路由
const ENV = "debug";
var protocol = "http://";
var baseUrl = "";
var base4Url = "";

switch (ENV) {
    case "debug":
        baseUrl = protocol + "cps-test.geekuiot.com/service";
        base4Url = protocol + "test.geekuiot.com/index.php/v4/";
        break;
    case "gongdianju":
        var host = window.location.host;
        var hostUrl = '192.168.8.8:8084';
        var host4Url = '192.168.8.8:8083';
        if (host == 'gongdianju-e.frp-test.geekuiot.com') {
            hostUrl = 'gongdianju-cps.frp-test.geekuiot.com';
            host4Url = 'gongdianju-api.frp-test.geekuiot.com';
        }
        baseUrl = protocol + hostUrl + "/service";
        base4Url = protocol + host4Url + "/v4/";
        break;

    case 'huizhou':
        baseUrl = protocol + "36.133.180.211:8084/service";
        base4Url = protocol + "36.133.180.211:8083/v4/";
        break;
    
    case 'huawei':
        baseUrl = protocol + "huawei-cps.geekuiot.com/service";
        base4Url = protocol + "huawei-api.geekuiot.com/v4/";
        break;    

    case "local":
        baseUrl = protocol + "localhost:9501";
        base4Url = protocol + "test.geekuiot.com/index.php/v4/";
        break;
}

var apiUrl = {
    //检测token的正确性
    checkToken: baseUrl + "/user/VerifyToken.json",
    //企业级登陆接口
    login: base4Url + "client/login",
    newLogin: baseUrl + '/user/UserLogin.json',
    //修改密码
    changePassword: base4Url + 'client/user/changeUserPassword',
    //菜单列表
    menu: baseUrl + "/Role/MenuList.json",
    //部门相关
    department: {
        list: baseUrl + "/Department/DepartmentList.json",
        update: base4Url + 'client/user/updateDepartment',
        //更新用户下级部门
        updateChildren: baseUrl + '/Department/UpdateChildrenDepartment.json',
    },

    //根据部门筛选用户
    user: {
        list: base4Url + "client/user/getUserlist",
        newList: baseUrl + '/Client/User/UserList.json',
        update: base4Url + 'client/user/updateUser',
        listByRole: baseUrl + '/Role/User.json',
        getUserProfile: base4Url + 'client/user/getUserProfile',
        updateUserProfile: base4Url + 'client/user/updateUserProfile',
    },
    //临时用户
    temporaryUser: {
        userList: base4Url + 'client/TemporaryUser/getUserList',
        equipmentList: base4Url + 'client/TemporaryUser/getUserDevice'

    },

    //空间管理
    spaceManege: {
        // 获取空间列表
        space: base4Url + 'client/space',
        // 获取空间下的设备
        spaceDevice: base4Url + 'client/space/getSpaceDeviceList',
        //删除设备
        deleteDevice: base4Url + 'client/space/deleteDevice',
        //更新设备
        updateChildSpace: base4Url + 'client/space/updateChildSpace',
        //获取设备id
        getDeviceList: base4Url + 'client/space/getDeviceList',
        //批量转移设备
        transferDevice: base4Url + 'client/space/transferDevice',
        //修改和修改设备
        addDevice: base4Url + 'client/space/addDevice',
    },
    // 授权管理
    authorize: {
        //空间地址接口
        space: base4Url + 'client/space',
        //获取设备接口
        getSpaceDeviceList: base4Url + 'client/space/getSpaceDeviceList',
        //获取所有的设备的
        getSpaceDeviceAll: base4Url + 'client/authorized/getSpaceDeviceAll',
        //查看授权的用户
        getAuthorizedUserList: base4Url + 'client/authorized/getAuthorizedUserList',
        //获取所有的部门
        getAllDepartment: base4Url + 'client/user/getAllDepartment',
        //获取弹窗部门列表
        getDepartmentList: base4Url + 'client/user/getDepartmentList',
        //获取授权用户弹窗用户
        getUser: base4Url + 'client/Authorized/getUser',
        //获取授权用户弹窗用户
        getUserList: base4Url + 'client/authorized/getUserList',
        //添加管理员
        addDeviceAdmin: base4Url + 'client/authorized/addDeviceAdmin',
        //添加授权用户
        addAuthorizedUser: base4Url + 'client/authorized/addAuthorizedUser',
        //修改用户授权
        updateAuthorizedUser: base4Url + 'client/authorized/updateAuthorizedUser',
        //取消授权
        delAuthorizedUser: base4Url + 'client/authorized/delAuthorizedUser',
        //批量授权
        batchAddAuthorizedUser: base4Url + 'client/authorized/batchAddAuthorizedUser',
    },
    //角色相关
    role: {
        list: baseUrl + '/Role/RoleList.json',
        // 新增/修改角色接口
        update: baseUrl + '/Role/UpdateRole.json',
        //更新角色用户
        updateRoleUser: base4Url + 'client/user/updateRoleUser',
        userAuth: baseUrl + '/Role/UserAuth.json',
        //角色权限
        roleAuth: baseUrl + '/Role/RoleAuth.json',
        //更新角色权限
        updateRoleAuth: baseUrl + '/Role/UpdateRoleAuth.json',
        //删除
        delete: baseUrl + '/Role/DeleteRole.json',
        //删除角色用户
        deleteRoleUser: baseUrl + '/Role/DeleteRoleUser.json',
    },

    //会议室相关
    conference: {
        roomList: base4Url + 'client/Appointment/appintmentAuditorList',
        // roomList: base4Url + 'client/Appointment/getAppointmentDeviceList'
        reservationRecord: base4Url + 'client/Appointment/getAppointmentDeviceList',
        appointmentQRCode: base4Url + 'Common/Qrcode/createQrCodeImage',
        equipmentDoorAll: base4Url + 'client/Appointment/getSpaceDeviceListByAuditor',
        equipmentAmmeterAll: base4Url + 'client/appointment/getAppointmentSpaceDeviceList',
        addConferenceConfigura: base4Url + 'client/Appointment/addAppointmentAuditor',
        delectConfiguration: base4Url + 'client/Appointment/deleteAppointmentAuditor',
        updateConConfig: base4Url + 'client/Appointment/updateAppintmentAuditor'
    },

    //门禁相关
    entranceGuard: {
        doorList: base4Url + 'client/Appointment/appintmentAuditorList',
        reservationRecord: base4Url + 'client/Appointment/getAppointmentDeviceList',

    },

    //快递业务相关
    express: {
        qrcode: base4Url + 'client/Courier/courierRegisterQrcode',
        courierList: base4Url + 'client/Courier/courierList',
        configurationInfo: base4Url + 'client/Courier/courierDeviceList',
        courierServicesCompany: base4Url + 'client/Courier/getExpress',
        auditUser: base4Url + 'client/Courier/getAuditorByOne',
        deliveryLockerList: base4Url + 'client/Courier/getSpaceDeviceListByCourier',
        addCourier: base4Url + 'client/Courier/addCompanyCourier',
        updateAuditor: base4Url + 'client/Courier/updateCourierAuditor',
        addCourierConfig: base4Url + 'client/Courier/addCourierDevice',
        delectExpressConfig: base4Url + 'client/Courier/deleteCourierDevice',
        saveExpressCompany: base4Url + 'client/Courier/saveExpress',
        updateCourierState: base4Url + 'client/Courier/updateCourierStatus',
        updateCourierCompanyState: base4Url + 'client/Courier/saveExpressStatus' 
    },

    //扫码支付业务相关
    scanPayment: {
        paymentOrderFormList: base4Url + 'client/tactics/payList',
        priceStrategy: base4Url + 'client/tactics/index',
        configurationInfo: base4Url + 'client/tactics/configTacticsList',
        doorequipment: base4Url + 'client/tactics/getSpaceDeviceListByTactics',
        openDoorRecord: base4Url + 'client/tactics/orderOpenList',
        addPriceStrategy: base4Url + 'client/tactics/updateTactics',
        delectPayBusiness: base4Url + 'client/tactics/deleteTactics',
        addConfig: base4Url + 'client/tactics/configTactics',
        delConfig: base4Url + 'client/tactics/deleteTacticsConfig'
    },

    //设备中心相关
    device: {
        // 获取地址列表
        address: base4Url + 'client/space',
        //获取类型列表
        typeList: base4Url + 'client/Equipment/getEquipmentTypeList',
        //类型列表
        deviceTypeList: baseUrl + '/Device/TypeList.json',
        //设备列表
        list: baseUrl + '/Device/List.json',

        // 获取地址
        location: base4Url + 'Client/Equipment/getDeviceLocation',
        // 获取分类空间下的类型
        deviceList: base4Url + 'Client/Equipment/getEquipmentSpaceDeviceList',
        //用户授权列表
        userAuth: baseUrl + '/Device/AuthList.json',

        //未授权用户列表
        noAuthUser: baseUrl + '/Device/NoAuthUser.json',

        //用户授权
        updateUserAuth: baseUrl + '/Device/UpdateUserDeviceAuth.json',
        //取消用户授权
        cancelUserAuth: baseUrl + '/Device/CancelUserDeviceAuth.json',

        //开门操作
        open: baseUrl + '/Device/Door.json',
        openLock: baseUrl + '/Device/OpenLock.json',
        openDoor: baseUrl + '/Device/OpenDoor.json',

        //设置箱格
        setBox: base4Url + 'Client/Equipment/batchSetDevice',

        //最新的设置箱格信息
        newSetBox: baseUrl + '/Device/SetBox.json',
        
        //门禁相关
        access: {
            log: baseUrl + '/Device/OpenRecord.json',
        },
        //箱格列表
        //boxList: base4Url + 'Client/Equipment/getDeviceBoxList',
        boxList: baseUrl + '/Device/BoxList.json',

        control: base4Url + 'Client/Equipment/deviceControl',

    },

    //业务相关
    bussiness: {
        order: {
            list: baseUrl + '/Order/List.json',
            release: baseUrl + '/Order/Release.json',
        }
    },

    //基站节能相关接口
    baseStation: {
        //获取设备类表
        device: baseUrl + "/Device/BaseStation/GetBaseStationByCompanyId.json",
        //获取设备的温度信息
        temperature: baseUrl + "/Device/BaseStation/GetBaseStationInfo.json",
        //获取逻辑控制信息
        logicalControl: baseUrl + "/Device/BaseStation/GetBaseStationPolicyByDevice.json",
        //控制箱格的开关
        BaseStationCmd: baseUrl + "/Device/BaseStation/ExecuteBaseStationCmd.json"
    },

    //上传相关
    upload: {
        image: base4Url + 'client/user/uploadImage',
        //
        user: base4Url + 'client/logistics/userImport',
        //货位绑定
        bindZhy: base4Url + 'client/logistics/stockImport',
        //产品批量
        product: base4Url + 'client/logistics/productImport',

    },

    //导出相关
    export: {
        product: base4Url + 'client/logistics/exportProduct',
        check: base4Url + 'client/logistics/exportCheckLog',
        log: base4Url + 'client/logistics/exportLog',
        openLog: base4Url + 'client/logistics/exportOpenLog',
        onOutLog: base4Url + 'client/logistics/newExportOnOutLog',
        keyUsageLog: base4Url + 'client/logistics/keyUsageLog',
    },

    //修改用户的状态
    state: base4Url + 'client/user/changeUserStatus',

    //操作日志
    log: {
        list: baseUrl + '/Log/OperatorList.json',
        //开门记录
        accessLog: baseUrl + '/Device/OpenLog'
    },

    //设置相关
    set: {
        basicSetup: base4Url + 'client/user/getHotline',
    },

    //钥匙柜相关
    key: {
        //设备中心
        center: baseUrl + '/Key/DeviceCenter.json',
        //钥匙列表
        list: baseUrl + '/Key/KeyList.json',
        //箱格列表
        boxList: baseUrl + '/Key/BoxList.json',
        //设备与箱格
        deviceAndBox: baseUrl + '/Key/DeviceAndBox.json',

        //更新
        update: baseUrl + '/Key/AddKey.json',
        //更新授权
        updateUserAuth: baseUrl + '/Key/UpdateUserAuth.json',
        //授权用户
        authUser: baseUrl + '/Key/AuthUser.json',
        //授权钥匙
        authKey: baseUrl + '/Key/AuthKey.json',

        //绑定箱格
        bindBox: baseUrl + '/Key/BindKey.json',
        //解绑
        unbindBox: baseUrl + '/Key/UnbindKey.json',

        //部门产品
        department: {
            list: baseUrl + '/Product/DepartmentProductList.json',
            update: baseUrl + '/Product/UpdateDepartmentProduct.json',
            cancel: baseUrl + '/Product/CancelDepartmentProduct.json',
        },
        //授权相关
        auth: {
            user: baseUrl + '/Product/UserAuth.json',
        },
        //使用记录
        usage: baseUrl + '/Key/GetUsageList.json',
        statistic: baseUrl + '/Key/Statistics.json',
    },

    //空间相关
    space: {
        'list': baseUrl + '/Space/List.json',
        'update': baseUrl + '/Space/UpdateSpace.json',
        'updateChild': baseUrl + '/Space/UpdateChildSpace.json',
        'delete': baseUrl + '/Space/DeleteSpace.json',
        //空间设备
        'device': baseUrl + '/Space/SpaceDevice.json',
        'updateDevice': baseUrl + '/Space/UpdateSpaceDevice.json',
        'transferDevice': baseUrl + '/Space/TransferDevice.json',
        'deviceAdministrator': baseUrl + '/Space/Device/AdministratorList.json',
        'deviceUpdateAministrator': baseUrl + '/Space/Device/UpdateAdministrator.json',
    },

    //wms相关
    wms: {
        deleteSource: baseUrl + '/Storage/DeleteSource.json',
        device: {
            list: baseUrl + '/Device/Manage.json',
            transfer: baseUrl + '/Device/TransferDevice.json',
            update: baseUrl + '/Device/UpdateDevice.json'
        },
        //仓库相关
        warehouse: {
            list: baseUrl + '/Storage/StorageList.json',
            update: baseUrl + '/Storage/UpdateWare.json',
            delete: ''
        },
        //库区相关
        storage: {
            //更新库区信息
            update: baseUrl + '/Storage/UpdateStorage.json',
            //删除库区
            delete: '',
            //库区列表
            list: '',
            //基本信息
            info: baseUrl + '/Storage/StorageInfo.json',
        },
        rack: {
            list: baseUrl + '/Storage/RackList.json',
            update: baseUrl + '/Storage/UpdateRack.json',
            delte: baseUrl + '/Storage/DeleteRack.json',
        },
        zhy: {
            list: baseUrl + '/Storage/ZhyList.json',
            update: baseUrl + '/Storage/UpdateZhy.json',
            detete: ''
        },
        product: {
            list: baseUrl + '/Product/Products.json',
            update: baseUrl + '/Product/UpdateProduct.json',
            delete: baseUrl + '/Storage/UpdateProduct.json',
            categoryList: baseUrl + '/Storage/ProductTypeList.json',
            updateCategory: baseUrl + '/Storage/UpdateProductType.json',
            productList: baseUrl + '/Product/ProductList.json',
            bindLocation: baseUrl + '/Product/BindLocation.json',
            unbindLocation: baseUrl + '/Product/UnbindLocation.json',
            onOutManagement: baseUrl + '/Storage/InOutDetail.json',
            checkStorage: baseUrl + '/Storage/CheckStorageList.json',
            checkStorageDetail: baseUrl + '/Storage/CheckStorageItemList.json',
        }
    },

    //common
    common: {
        qrcode: base4Url + '/Common/Qrcode/createQrCodeImage'
    },

    //看板相关
    kanban: {
        device: {
            deviceBoxUsage: baseUrl + '/Device/BoxUsage.json',
            online: baseUrl + '/Device/OnlineStatistics.json',
        },
        storage: {
            storageUsage: baseUrl + '/Storage/UsageRate.json',
            warn: baseUrl + '/Product/StockWarn.json',
            inoutSummary: baseUrl + '/Storage/SevenDaySummaryOfInOut.json',
            allStorageData: baseUrl + '/Storage/AllStorageData.json'
        },
    }

}; 