using AutoMapper;
using CommonHelper.ObjectExtention;
using CommonHelper.String;
using Model.IdentityEntities;
using Service.AppUserService;
using Web.Core;
using Web.Filters;
using Web.Models;
using Web.Models.SSO;
using log4net;
using Microsoft.AspNet.Identity.Owin;
//using Moit.SingleWindow.ClientLib;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Web.Common;
using System.Configuration;
using Model.Entities;
using CommonHelper.AsyncExtension;
using Service.NotificationService;
using Service.DanhMucService;
using Service.BlogService;
using Service.SanPhamService;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        ApplicationSignInManager _signInManager;
        ApplicationUserManager _userManager;


        readonly IMapper _mapper;
        readonly ILog _Ilog;
        private readonly IDanhMucService _danhMucService;
        private readonly ISanPhamService _sanPhamService;
        private readonly IBlogService _blogService;
        readonly IAppUserService _AppUserService;
        readonly INotificationService _NotificationService;

        private const string CartStorage = "CartStorage";
        public HomeController(
                IMapper mapper, ILog iLog,
                IDanhMucService danhMucService,
                ISanPhamService sanPhamService,
                IBlogService blogService,
                IAppUserService appUserService,
                INotificationService NotificationService

                )
        {

            _mapper = mapper;
            _Ilog = iLog;
            this._danhMucService = danhMucService;
            this._sanPhamService = sanPhamService;
            this._blogService = blogService;
            _AppUserService = appUserService;
            _NotificationService = NotificationService;
        }

        public HomeController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Menu()
        {
            var model = _danhMucService.GetDanhMucSanPham();
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult Blog()
        {
            var model = _blogService.FindBy(x=>x.IsPhatHanh).ToList();
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult BlogSingle(long id)
        {
            var model = _blogService.GetDtoById(id);
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ProductSingle()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Contact()
        {
            return View();
        }
       
        [HttpPost]
        [AllowAnonymous]
        public JsonResult AddToCart(long id)
        {
            var cart = SessionManager.GetValue(CartStorage) as Dictionary<long, int> ?? new Dictionary<long, int>();
            if (cart.ContainsKey(id))
            {
                cart[id]++;
            }
            else
            {
                cart[id] = 1;
            }
            SessionManager.SetValue(CartStorage, cart);
            return Json(cart.Sum(x=>x.Value));
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult GetCartNum()
        {
            var cart = SessionManager.GetValue(CartStorage) as Dictionary<long, int> ?? new Dictionary<long, int>();
            return Json(cart.Sum(x => x.Value));
        }

        [AllowAnonymous]
        public ActionResult Cart()
        {
            var cart = SessionManager.GetValue(CartStorage) as Dictionary<long, int> ?? new Dictionary<long, int>();
            var sanphamIds = cart.Select(x => x.Key).ToList();
            var sanphams = _sanPhamService.GetByIds(sanphamIds);
            foreach (var item in sanphams)
            {
                item.SoLuong = cart[item.Id];
                item.GiaTong = item.SoLuong * item.Gia;
            }
            return View(sanphams);
        }


        [AllowAnonymous]
        public ActionResult Checkout()
        {
            var cart = SessionManager.GetValue(CartStorage) as Dictionary<long, int> ?? new Dictionary<long, int>();
            var sanphamIds = cart.Select(x => x.Key).ToList();
            var sanphams = _sanPhamService.GetByIds(sanphamIds);
            foreach (var item in sanphams)
            {
                item.SoLuong = cart[item.Id];
                item.GiaTong = item.SoLuong * item.Gia;
            }
            return View(sanphams);
        }


        [AllowAnonymous]
        public ActionResult Shop()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult About()
        {
            return View();

        }


    }
}