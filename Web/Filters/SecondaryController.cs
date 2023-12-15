using System.Web.Mvc;
using System.Web.Configuration;
//using Moit.SingleWindow.ClientLib;
using CommonHelper.ObjectExtention;

namespace Web.Filters
{
    public class SecondaryController : Controller
    {
        public static string GETTOKENLINK = WebConfigurationManager.AppSettings["GETTOKENLINK"];
        //protected MoitUserInfo userFrontend;
        //protected MoitBusinessInfo userBusinessInfo;
        //private readonly IMoitUserFrontEndInfoService _moitUserFrontEndInfoService;
        //private readonly IMoitBusinessInfoService _moitBusinessInfoService;

        //public SecondaryController()
        //{
        //    if (!MoitIdSession.IsConnected)
        //    {
        //        MoitIdAuthen.Login(GETTOKENLINK);
        //    }
        //    else
        //    {
        //        userFrontend = MoitIdAuthen.GetUserInfo();
        //        userBusinessInfo = MoitIdAuthen.GetBusinessInfo(); ;
        //    }
        //}

        public SecondaryController()
        {
            //userFrontend = SessionManager.GetValue<MoitUserInfo>("userfrontend");
            //userBusinessInfo = SessionManager.GetValue<MoitBusinessInfo>("userfrontendbusiness");

            //if(userFrontend == null || userBusinessInfo == null)
            //{
            //    _moitUserFrontEndInfoService = DependencyResolver.Current.GetService<IMoitUserFrontEndInfoService>();
            //    _moitBusinessInfoService = DependencyResolver.Current.GetService<IMoitBusinessInfoService>();

            //    var Hiuserfrontend = _moitUserFrontEndInfoService.FindBy(x => x.LoginName == "1122334455").FirstOrEmpty();
            //    var Hiuserfrontendbusiness = _moitBusinessInfoService.FindBy(x => x.HiUserId == Hiuserfrontend.Id).FirstOrEmpty();

            //    var userfrontend = new Moit.SingleWindow.ClientLib.MoitUserInfo()
            //    {
            //        Id = (int)Hiuserfrontend.MoitUserId,
            //        LoginName = Hiuserfrontend.LoginName,
            //        DisplayName = Hiuserfrontend.DisplayName,
            //        Email = Hiuserfrontend.Email,
            //        Phone = Hiuserfrontend.Phone,
            //        Mobile = Hiuserfrontend.Mobile
            //    };
            //    SessionManager.SetValue("userfrontend", userfrontend);

            //    var userfrontendbusiness = new Moit.SingleWindow.ClientLib.MoitBusinessInfo()
            //    {
            //        Website = Hiuserfrontendbusiness.Website,
            //        RepresenterName = Hiuserfrontendbusiness.RepresenterName,
            //        RepresenterMobile = Hiuserfrontendbusiness.RepresenterMobile,
            //        RepresenterEmail = Hiuserfrontendbusiness.RepresenterEmail,
            //        Fax = Hiuserfrontendbusiness.Fax,
            //        CityName = Hiuserfrontendbusiness.CityName,
            //        CityId = Hiuserfrontendbusiness.CityId,
            //        Detail = Hiuserfrontendbusiness.Detail,
            //        RegisterFileLink = Hiuserfrontendbusiness.RegisterFileLink,
            //        Address = Hiuserfrontendbusiness.Address,
            //        Email = Hiuserfrontendbusiness.Email,
            //        Phone = Hiuserfrontendbusiness.Phone,
            //        TypeId = Hiuserfrontendbusiness.TypeId,
            //        TaxCode = Hiuserfrontendbusiness.TaxCode,
            //        ShortName = Hiuserfrontendbusiness.ShortName,
            //        EnglishName = Hiuserfrontendbusiness.EnglishName,
            //        Name = Hiuserfrontendbusiness.Name,
            //        Id = (int)Hiuserfrontendbusiness.BusinessId,
            //        SubmitedDate = Hiuserfrontendbusiness.SubmitedDate
            //    };
            //    SessionManager.SetValue("userfrontendbusiness", userfrontendbusiness);
            //}
        }
    }
}