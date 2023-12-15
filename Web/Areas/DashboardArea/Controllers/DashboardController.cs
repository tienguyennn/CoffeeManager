using AutoMapper;
using BotDetect.C5;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using CommonHelper.String;
using Model;
using Model.Entities;
using Service.AppUserService;
//using Web.Areas.KeKhaiArea.Data;
using Web.Core;
using Web.Filters;
using log4net;
using Lucene.Net.Search;
using OfficeOpenXml.FormulaParsing.ExpressionGraph.FunctionCompilers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Runtime.Remoting.Channels;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Web.Areas.DashboardArea.Controllers
{
    public class DashboardController : BaseController
    {
        readonly IMapper _mapper;
        readonly ILog _log;
        public DashboardController(
            IMapper mapper,
            ILog log)
        {
            _log = log;
            _mapper = mapper;
        }

        public ActionResult IndexEOF()
        {
            return View();
        }
        public ActionResult Index(long idDotKeKhai = 0, long khaosat = 0)
        {
            return View();

        }
    }
}

