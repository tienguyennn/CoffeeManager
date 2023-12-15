using Model;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Web.Helpers;
using Model.MongoEntities;
using MongoDB.Driver;
using Service.AppUserService.Dto;

namespace Web.Filters
{
    public class AuditAttribute : ActionFilterAttribute
    {
        Audit audit;
        public int AuditingLevel { get; set; }
        public string ActionName { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //Stores the Request in an Accessible object
            var request = filterContext.HttpContext.Request;
            //Generate an audit
            //audit = new Audit()
            //{
            //    // Your Audit Identifier
            //    AuditID = Guid.NewGuid(),
            //    // Our Username (if available)
            //    UserName = (request.IsAuthenticated) ? filterContext.HttpContext.User.Identity.Name : "Anonymous",
            //    // The IP Address of the Request
            //    IPAddress = request.ServerVariables["HTTP_X_FORWARDED_FOR"] ?? request.UserHostAddress,
            //    // The URL that was accessed
            //    URLAccessed = request.RawUrl,
            //    // Creates our Timestamp
            //    TimeAccessed = DateTime.Now,
            //    Data = SerializeRequest(request)
            //};






            AuditDTO audit = new AuditDTO()
            {
                // Your Audit Identifier
                AuditID = Guid.NewGuid(),
                // Our Username (if available)
                UserName = (request.IsAuthenticated) ? filterContext.HttpContext.User.Identity.Name : "Ẩn danh",
                // The IP Address of the Request
                IPAddress = request.ServerVariables["HTTP_X_FORWARDED_FOR"] ?? request.UserHostAddress,
                // The URL that was accessed
                URLAccessed = request.RawUrl,
                // Creates our Timestamp
                TimeAccessed = DateTime.UtcNow,
                Data = SerializeRequest(request),
                ActionName = ActionName
            };

            //MongoDBContext mongoDBContext = new MongoDBContext();
            //var collect = mongoDBContext.Database.GetCollection<AuditDTO>("Audit");
            //var builder = Builders<AuditDTO>.Filter;
            //collect.InsertOne(audit);

            ////Finishes executing the Action as normal
            //base.OnActionExecuting(filterContext);
        }
        // This will serialize the Request object based on the
        // level that you determine
        private string SerializeRequest(HttpRequestBase request)
        {
            switch (AuditingLevel)
            {
                // No Request Data will be serialized
                case 0:
                default:
                    return "";
                // Basic Request Serialization - just stores Data
                case 1:
                    return Json.Encode(new { request.Cookies, request.Headers, request.Files });
                // Middle Level - Customize to your Preferences
                case 2:
                    return Json.Encode(new { request.Cookies, request.Headers, request.Files, request.Form, request.QueryString, request.Params });
                // Highest Level - Serialize the entire Request object (As mentioned earlier, this will blow up)
                case 3:
                    // We can't simply just Encode the entire
                    // request string due to circular references
                    // as well as objects that cannot "simply"
                    // be serialized such as Streams, References etc.
                    return Json.Encode(request);
            }
        }

    }
}