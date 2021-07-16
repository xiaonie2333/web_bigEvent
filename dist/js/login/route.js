//相关性路由
const ENV = "debug";
var protocol = "http://";
var baseUrl = "";
var base4Url = "";

switch (ENV) {
    case "debug":
        baseUrl = protocol + "";
        base4Url = protocol + "";        
        break;
    
    case "production":
        baseUrl = protocol + "";
        base4Url = protocol + "";
        break;
    
    case "local":
        baseUrl = protocol + "192.168.8.142:9501";
        base4Url = protocol + "";
        break;            
}

var apiUrl = {
    //检测token的正确性
    checkToken: baseUrl + "/user/VerifyToken.json",
    //登陆接口
    login: base4Url + "client/login",
    //菜单列表
    menu: baseUrl + "/Role/MenuList.json",
    //部门相关
    department: baseUrl + "/Department/DepartmentList.json",
    
    //角色相关

};