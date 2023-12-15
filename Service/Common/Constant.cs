using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Service.Common
{
    public class Constant
    {

        public enum WORKFLOW_SHOWTYPE
        {
            USER,
            ROLE
        }

        public enum EDIT_OBJECT_ENUM
        {
            FAIL,
            SUCCESS
        }

        public enum WORKFLOW_REQUEST_EDIT
        {
            NEW,
            PENDING,
            RESOLVED
        }

        public enum FILE_TYPE_ENUM
        {
            IMAGE,
            PDF,
            WORD,
            OTHER
        }

        public class NHOM_DANHMUC_CONSTANT
        {
            public const string GIOITINH = "GIOITINH";
            public const string VITRI = "VITRI";
            public const string DONVI_TINH = "DONVI_TINH";
            public const string LOAIDANHMUCBIEUDO = "LOAIDANHMUCBIEUDO";
            public const string CAPDANHGIA = "CAPDANHGIA";
        }

        public class GioiTinh
        {
            [DisplayName("Nam")]
            public static int Male { get; } = 1;

            [DisplayName("Nữ")]
            public static int Female { get; } = 0;
        }
        public class TypeAudit
        {
            public static int GiaHanBaoCao { get; } = 1;
        }
        public class CAUHINH_HETHONG_CONSTANT
        {
            public const string CAUHINH_HETHONG = "CAUHINH_HETHONG";
            public const string TEN_TINH = "TEN_TINH";
            public const string FAX = "FAX";
            public const string EMAIL = "EMAIL";
            public const string DIENTHOAI = "DIENTHOAI";
            public const string TEN_DONVI = "TEN_DONVI";
            public const string DIACHI_DONVI = "DIACHI_DONVI";
            public const string NAM_SANXUAT = "NAM_SANXUAT";
            public const string DIACHI_HETHONG = "DIACHI_HETHONG";
            public const string MATINH = "MATINH";

            /**
             * dành cho việc SSO
             */
            public const string SSO_SERVICE_PROVIDER = "SSO_SERVICE_PROVIDER";
            public const string SSO_DOMAIN = "SSO_DOMAIN";
            public const string SSO_LOGOUT = "SSO_LOGOUT";
            public const string SSO_LOGIN_TICKET = "SSO_LOGIN_TICKET";
            public const string CLIENT_ID = "CLIENT_ID";
            public const string CLIENT_SECRET = "CLIENT_SECRET";
            public const string URL_CALLBACK = "URL_CALLBACK";
            public const string AUTHORIZATION_URI = "AUTHORIZATION_URI";
            public const string AUTHORIZATION_TOKEN_URI = "AUTHORIZATION_TOKEN_URI";
            public const string USER_INFO_URI = "USER_INFO_URI";
            public const string GRANT_TYPE = "GRANT_TYPE";
            public const string RESPONSE_TYPE = "CODE";
            public const string LOGOUT_URI = "LOGOUT_URI";

        }

        public class MODULE_INFO
        {
            public string Name { get; set; }
            public string Code { get; set; }
            public string Link { get; set; }
        }

        public class USER_TYPE_CONSTANT
        {
            public static int MOIT = 0;
            public static int SYSTEM = 1;
        }

        public class MODULE_CONSTANT
        {
            public static string HOSO_DICHVUCONG = "HOSO_DICHVUCONG";
            public static string LICHSU_XULY = "LICHSU_XULY";
            public static string KEKHAI_DICHVUCONG = "KEKHAI_DICHVUCONG";
            public static string CONGVAN = "CONGVAN";
            public static string SO_CONGVAN = "SO_CONGVAN";
            public static string CDS_NHOMTIEUCHI = "CDS_NHOMTIEUCHI";
            public static string CDS_TONGHOP_NHOMTIEUCHI = "CDS_TONGHOP_NHOMTIEUCHI";
            public static string CDS_SOLIEU_DANHGIA = "CDS_SOLIEU_DANHGIA";
            public static string TEMP_FILE_YEUCAU_BAOCAO = "TEMP_FILE_YEUCAU_BAOCAO";
            public static string TEMP_FILE_GIAITRINH = "TEMP_FILE_GIAITRINH";
            public static string REAL_FILE_GIAITRINH = "REAL_FILE_GIAITRINH";
            public static string TAILIEU_BIEUMAU = "TAILIEU_BIEUMAU";
            public static string CDS_TRUCOT_IMPORT = "CDS_TRUCOT_IMPORT";
            public static string CDS_TRUCOT_EXPORT_KEKHAI = "CDS_TRUCOT_EXPORT_KEKHAI";
            public static string CDS_TRUCOT_EXPORT_RASOAT = "CDS_TRUCOT_EXPORT_RASOAT";
            public static string CDS_TRUCOT_EXPORT_GIAITRINH = "CDS_TRUCOT_EXPORT_GIAITRINH";
            public static string CDS_TRUCOT_EXPORT_CHOT = "CDS_TRUCOT_EXPORT_CHOT";
            public static string EXCEL_SOLIEU_KEKHAI = "EXCEL_SOLIEU_KEKHAI";
            public static string TONGHOP_FILE_GIAITRINH = "TONGHOP_FILE_GIAITRINH";
            public static string TAILIEU_LUUTRU = "TAILIEU_LUUTRU";
            public static string YKIEN_RASOAT = "YKIEN_RASOAT";
            public static string KHAOSAT = "KHAOSAT";
            public static string TAILIEU_KHAOSAT = "TAILIEU_KHAOSAT";
            public static string UPLOAD_KHAOSAT = "UPLOAD_KHAOSAT";
            public static string FILE_CHUKYSO_KEKHAI = "FILE_CHUKYSO_KEKHAI";
            public static string DOITUONG_THANHTRA => "DOITUONG_THANHTRA";
            public static string CUOCTHANHTRA = "CUOCTHANHTRA";
        }

        public class VAITRO_CONSTANT
        {
            public static string CHUYENVIEN = "CHUYENVIEN";
            public static string CHUYENVIENTUVAN = "CHUYENVIENTUVAN";
            public static string CHUYENVIENTONGHOP = "CHUYENVIENTONGHOP";
            public static string TUVAN = "TUVAN";
            public static string LANHDAOPHONG = "LANHDAOPHONG";
            public static string LANHDAOCUC = "LANHDAOCUC";
            public static string LANHDAODIEUCHUYEN = "LANHDAODIEUCHUYEN";
            public static string LANHDAOTONGHOP = "LANHDAOTONGHOP";
            public static string SYSADMIN = "SYSADMIN";
            public static string TIEPNHAN = "TIEPNHAN";
            public static string RASOAT = "RASOAT";
            public static string CHUYENVIENRASOAT = "CHUYENVIENRASOAT";
            public static string LANHDAOSO = "LANHDAOSO";
            public static string HOIDONGCHAMDIEM = "HOIDONGCHAMDIEM";
            public static string HOIDONG = "HOIDONG";
            public static string PHONG_VANHOA_HUYEN = "PHONG_VANHOA_HUYEN";
            public static string TONGHOPSO = "TONGHOPSO";
            public static string THEODOISOLIEU = "THEODOISOLIEU";

           // [DisplayName("Cán bộ thanh tra")]
            public static string CANBOTHANHTRA { get; set; } = "CANBOTHANHTRA";
            //[DisplayName("Lãnh đạo phòng ban")]
            public static string LANHDAOPHONGBAN { get; set; } = "LANHDAOPHONGBAN";
            //[DisplayName("Lãnh đạo thanh tra")]
            public static string LANHDAOTHANHTRA { get; set; } = "LANHDAOTHANHTRA";
           
        }

        public class CAPDANHGIA_CONSTANT
        {
            public static string CAPSO = "CAPSO";
            public static string CAPQUANHUYEN = "CAPQUANHUYEN";
            public static string CAPXAPHUONG = "CAPXAPHUONG";
            public static string TINH = "TINH";
            public static string BO_CO_DVC = "BO_CO_DVC";
            public static string BO_KO_CO_DVC = "BO_KO_CO_DVC";
        }



        public class TAILIEUCONSTANT
        {
            public static string HOSODICHVUCONG = "HOSODICHVUCONG";
            public static string BIEUMAUDICHVUCONG = "BIEUMAUDICHVUCONG";
            public static string GIAYPHEP = "GIAYPHEP";
            public static string GIAYPHEP_CAPNHAT = "GIAYPHEP_CAPNHAT";
        }

        public class DANGKEKHAI
        {
            public static string KEKHAITHEONGAY = "KEKHAITHEONGAY";
            public static string KEKHAITHEODOT = "KEKHAITHEODOT";
        }

        public class ITEMTYPE
        {
            public static int BOCHISO = 1;
            public static int DOTKEKHAI = 2;
            public static int TONGHOP = 3;
            public static int NHACNHO_KEKHAI = 4;
            public static int DIEM_TONGHOP = 5;
        }

        public class DATATYPE
        {
            public static string INT = "INT";
            public static string DATETIME = "DATETIME";
            public static string FLOAT = "FLOAT";
        }

        public class TYPE_KEKHAI_SOLIEU
        {
            public static int TAOMOI = 1;
            public static int CAPNHAT = 2;
        }

        public enum TRANGTHAI_BAOCAO_TONGHOP
        {
            MOITAO,
            DATRINH_LANHDAO,
            DA_DUYET
        }

        public enum TRANGTHAI_DOTKEKHAI
        {
            CHUADUYET,
            DADUYET,
            CHORASOAT,
            GIAITRINH,
            CHOCHOTSOLIEU,
            KETTHUC,
            DA_GUI_LANHDAO
        }

        public class LoaiTruCotSo
        {
            [DisplayName("Trụ cột chung")]
            public static int TruCotChung { get; } = 1;

            [DisplayName("Trụ cột riêng")]
            public static int TruCotRieng { get; } = 2;
        }

        public class CachTinhDiemBaoCao
        {
            [DisplayName("Lấy tổng các đơn vị có số liệu")]
            public static int LayDonViCoSoLieu { get; } = 1;

            [DisplayName("Trunb bình cộng số liệu đơn vị")]
            public static int TrungBinhCongSoLieu { get; } = 2;
        }

        public class TrangThaiDotKeKhaiToDisplay
        {
            [DisplayName("Chưa duyệt")]
            public static int ChuaDuyet { get; set; } = TRANGTHAI_DOTKEKHAI.CHUADUYET.ToInt();
            [DisplayName("Đã duyệt")]
            public static int DaDuyet { get; set; } = TRANGTHAI_DOTKEKHAI.DADUYET.ToInt();

            [DisplayName("Chờ rà soát")]
            public static int ChoRaSoat { get; set; } = TRANGTHAI_DOTKEKHAI.CHORASOAT.ToInt();
            [DisplayName("Giải trình")]
            public static int GiaiTrinh { get; set; } = TRANGTHAI_DOTKEKHAI.GIAITRINH.ToInt();

            [DisplayName("Chờ chốt số liệu")]
            public static int ChoChotSoLieu { get; set; } = TRANGTHAI_DOTKEKHAI.CHOCHOTSOLIEU.ToInt();
            [DisplayName("Kết thúc")]
            public static int KetThuc { get; set; } = TRANGTHAI_DOTKEKHAI.KETTHUC.ToInt();


            [DisplayName("Đã gửi lãnh đạo")]
            public static int DaGuiLanhDao { get; set; } = TRANGTHAI_DOTKEKHAI.DA_GUI_LANHDAO.ToInt();
        }


        public enum TRANGTHAI_HOSO_DONVI_KEKHAI
        {
            MOITAO, //0
            DA_TRINH_KEKHAI_LANHDAO, //1
            DA_GUI_SOLIEU_KEKHAI_SO_4T, //2
            DA_XACNHAN_SOLIEU_KEKHAI, //3

            DA_GUI_DONVI_SOLIEU_RASOAT, //4
            DA_GUI_LANHDAO_SOLIEU_GIAITRINH, //5
            DA_GUI_SO_4T_SOLIEU_GIAITRINH, //6
            DA_CHOT_SOLIEU, //7

            DA_TRINH_KEKHAI_PHONG_VANHOA_HUYEN, //8
            DA_TRINH_GIAITRINH_PHONG_VANHOA_HUYEN //9
        }

        public enum TRANGTHAI_HOSO_DONVI_BAOCAO
        {
            MOITAO,
            DA_GUI_SO_4T,
            DA_GUI_BO,
        }


        public class LoaiTongHopSoLieu
        {
            [DisplayName("Tồng hợp theo một tiêu chí")]
            public static int LayChinhXacTheoKey { get; set; } = 1;

            [DisplayName("Tổng hợp theo tổng của số liệu kê khai")]
            public static int TinhTongTheoKey { get; set; } = 2;

            [DisplayName("Tổng hợp theo số lượng đơn vị có số liệu")]
            public static int TongSoDonViCoKey { get; set; } = 3;

            [DisplayName("Tổng hợp theo tồn tại số liệu kê khai")]
            public static int CoTonTaiKey { get; set; } = 4;
        }

        public class TrangThaiHoSoDonViKeKhaiToDisplay
        {
            [DisplayName("Mới tạo")]
            public static int MoiTao { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.MOITAO.ToInt();
            [DisplayName("Đã trình số liệu kê khai lên lãnh đạo")]
            public static int DaTrinhKeKhaiLanhDao { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_TRINH_KEKHAI_LANHDAO.ToInt();

            [DisplayName("Đã gửi số liệu kê khai lên sở 4T")]
            public static int DaGuiSoLieuKeKhaiToSo4T { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_GUI_SOLIEU_KEKHAI_SO_4T.ToInt();
            [DisplayName("Đã xác nhận số liệu kê khai")]
            public static int DaXacNhanSoLieuKeKhai { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_XACNHAN_SOLIEU_KEKHAI.ToInt();

            [DisplayName("Đã gửi đơn vị số liệu để giải trình")]
            public static int DaGuiDonViSoLieuRaSoat { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_GUI_DONVI_SOLIEU_RASOAT.ToInt();
            [DisplayName("Đã gửi lãnh đạo số liệu giải trình")]
            public static int DaGuiLanhDaoSoLieuGiaiTrinh { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_GUI_LANHDAO_SOLIEU_GIAITRINH.ToInt();

            [DisplayName("Đã gửi sở 4T số liệu giải trình")]
            public static int DaGuiSo4TSoLieuGiaiTrinh { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_GUI_SO_4T_SOLIEU_GIAITRINH.ToInt();

            [DisplayName("Đã chốt số liệu")]
            public static int DaChotSoLieu { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_CHOT_SOLIEU.ToInt();

            [DisplayName("Đã trình số liệu kê khai lên phòng văn hóa huyện")]
            public static int DaTrinhKeKhaiPhongVanHoaHuyen { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_TRINH_KEKHAI_PHONG_VANHOA_HUYEN.ToInt();

            [DisplayName("Đã trình số liệu giải trình lên phòng văn hóa huyện")]
            public static int DaTrinhSoLieuGiaiTrinhPhongVanHoaHuyen { get; set; } = TRANGTHAI_HOSO_DONVI_KEKHAI.DA_TRINH_GIAITRINH_PHONG_VANHOA_HUYEN.ToInt();
        }

        public class TrangThaiKeKhaiTheoDoi
        {
            [DisplayName("Có số liệu kê khai")]
            public static int CoSoLieuKeKhai { get; set; } = 1;

            [DisplayName("Đã gửi số liệu kê khai")]
            public static int DaGuiSoLieuKeKhai { get; set; } = 2;

            [DisplayName("Đã rà soát lần 1")]
            public static int DaRaSoatLan1 { get; set; } = 3;

            [DisplayName("Đã giải trình số liệu")]
            public static int DaGiaiTrinhSoLieu { get; set; } = 4;

            [DisplayName("Đã gửi số liệu giải trình")]
            public static int DaGuiSoLieuTrinh { get; set; } = 5;

            [DisplayName("Đã rà soát số liệu lần 2")]
            public static int DaRaSoatSoLieuLan2 { get; set; } = 6;

            [DisplayName("Đã chốt số liệu")]
            public static int DaChotSoLieu { get; set; } = 7;

            [DisplayName("Chấm điểm")]
            public static int ChamDiem { get; set; } = 8;
        }


        public class TrangThaiNhacNho
        {
            [DisplayName("Chưa nhắc nhở")]
            public static int ChuaNhacNho { get; set; } = 1;

            [DisplayName("Đã nhắc nhở")]
            public static int DaNhacNho { get; set; } = 2;
        }

        public class DangTongHop
        {
            [DisplayName("Theo biểu mẫu")]
            public static string TheoBieuMau { get; set; } = "TheoBieuMau";
            
            [DisplayName("Liệt kê số liệu kê khai")]
            public static string LietKeSoLieuKeKhai { get; set; } = "LietKeSoLieuKeKhai";
        }
        

        public enum LOAI_LOG_KEKHAI
        {
            DONVI_KEKHAI,
            LANHDAO_DONVI_SUA_KEKHAI,
            CHUYENVIEN_4T_RASOAT,
            DONVI_GIAITRINH,
            LANHDAO_DONVI_SUA_GIAITRINH,
            CHUYENVIEN_4T_CHOT,
            HOIDONG_CHAMDIEM
        }


        public enum TRANGTHAI_QUATRINH_XULY_HOSO_DONVI_KEKHAI
        {
            CHUA_XULY, //0
            DANG_XULY, //1
            DA_XULY //2
        }

        public class ACTIONTYPE_VIEW_KHAOSAT
        {
            public static int TAOMOI = 1;
            public static int CAPNHAT = 2;
            public static int XEM = 3;
        }

        public enum LOAI_DIEM_CHUYENDOISO
        {
            KEKHAI,
            RASOAT,
            GIAI_TRINH,
            CHOT_SOLIEU,
            TONGHOP,
            HOIDONG_CHAMDIEM,
            CHOT_HOIDONG_CHAMDIEM
        }

        /// <summary>
        /// danh sách các khóa không được sử dụng để lưu log
        /// </summary>
        public static List<string> KEYS_NOT_ALLOW_TO_LOG = new List<string>()
        {
            "diem.",
            "diemcuoicung.",
            "diemtongthe.",
            "tyle.",
            "X-Requested-With",
            "IdDotKeKhai",
            "IdsFileGiaiTrinh",
            "IdTruCotSo",
            "IdHoSoKeKhai",
            "IdNhomTieuChi",
            "IdBoChiSo",
            "IdDotKeKhai",
            "IsTruCotSoDanhChoDonVi"
        };

        public static List<string> KEYS_NOT_KEKHAI = new List<string>()
        {
            "diem.",
            "diemcuoicung.",
            "diemtongthe.",
            "upload.",
            "tyle.",
            "area."
        };

        public class CAPDANHGIA
        {
            [DisplayName("Cấp Quận/Huyện")]
            public static string CAPQUANHUYEN => "CAPQUANHUYEN";
            [DisplayName("Cấp Sở")]
            public static string CAPSO => "CAPSO";
        }

        public class TEN_CHISO_CONSTANT
        {
            public const string THONGTINCHUNG = "Thông tin chung";
            public const string XAHOISO = "Xã hội số";
            public const string KINHTESO = "Kinh tế số";
            public const string CHINHQUYENSO = "Chính quyền số";
        }

        public class LoginStats
        {
            public const string FailCount = "FailCount";
        }


    }
}
