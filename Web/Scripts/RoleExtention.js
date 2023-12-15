var LstRole = [];

///Khởi tạo giá trị quyền
function InitRole(lstRoleSv) {
    LstRole = [];
    LstRole = lstRoleSv;
}

function LinkRole(Url, Name, Role, strClass, title) {
    //Nếu Role - Mã thao tác tồn tại thì xét quyền truy cập
    if (Role && Role.trim().length > 0) {
        //Nếu Không tồn tại user hoặc User không có bất cứ thao tác nào
        if (!LstRole || LstRole.length == 0) {
            return "";
        }
        else {
            //Trường hợp tồn tại thao tác xét Role có nằm trong danh sách thao tác người dùng có không ?
            if (LstRole.indexOf(Role) < 0) {
                return "";
            }
        }
    }

    var strUrl = Url;
    var builder = '<a href="' + strUrl + '" class="' + strClass + '" title="' + title + '">' + Name + '</a>';
    return builder;
}

//Kiểm tra xem người dùng có quyền thao tác không
function HasRole(Role) {
    if (Role && Role.trim().length > 0) {
        //Nếu Không tồn tại user hoặc User không có bất cứ thao tác nào
        if (!LstRole || LstRole.length == 0) {
            return false;
        }
        else {
            //Trường hợp tồn tại thao tác xét Role có nằm trong danh sách thao tác người dùng có không ?
            if (LstRole.indexOf(Role) >= 0) {
                return true;
            }
        }
    }
    return false;
}
function LinkRoleFunc(Url, Name, Role, strClass, lstParam, title) {

    //Nếu Role - Mã thao tác tồn tại thì xét quyền truy cập
    if (Role && Role.trim().length > 0) {
        //Nếu Không tồn tại user hoặc User không có bất cứ thao tác nào
        if (!LstRole || LstRole.length == 0) {
            return "";
        }
        else {
            //Trường hợp tồn tại thao tác xét Role có nằm trong danh sách thao tác người dùng có không ?
            if (LstRole.indexOf(Role) < 0) {
                return "";
            }
        }
    }

    var strUrl = Url;
    //strUrl = strUrl + "(";
    //if (lstParam != null && lstParam.length > 0) {
    //    strUrl += lstParam.join(",");
    //}

    //strUrl += ")";

    var builder = '<a href="javascript:void(0)"  onClick=' + strUrl + ' title="' + title + '" class="' + strClass + '" >' + Name + '</a>';
    return builder;
}