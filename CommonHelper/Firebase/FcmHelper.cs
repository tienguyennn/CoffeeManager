using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace CommonHelper.Firebase
{
    public class FcmHelper
    {
        private string serverKey { set; get; }
        private string senderId { set; get; }
        private string webAddr = "https://fcm.googleapis.com/fcm/send";

        public FcmHelper(string serverKey, string senderId)
        {
            this.serverKey = serverKey;
            this.senderId = senderId;
        }

        public string SendNotification(string deviceToken, string title, string msg)
        {
            var result = "-1";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(webAddr);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Add(string.Format("Authorization: key={0}", serverKey));
            httpWebRequest.Headers.Add(string.Format("Sender: id={0}", senderId));
            httpWebRequest.Method = "POST";

            var payload = new
            {
                to = deviceToken,
                priority = "high",
                content_available = true,
                notification = new
                {
                    body = msg,
                    title = title
                },
            };
            var serializer = new JavaScriptSerializer();
            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = serializer.Serialize(payload);
                streamWriter.Write(json);
                streamWriter.Flush();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }
            return result;
        }
    }
}
