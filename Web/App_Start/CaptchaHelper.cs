using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BotDetect.Web.Mvc;

namespace Web
{

    public static class CaptchaHelper
    {
        public static MvcCaptcha GetRegistrationCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("RegistrationCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(255, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha GetPhanAnhCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("PhanAnhCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;
            
            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha GetPhanAnhAppCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("PhanAnhAppCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha RegisterWebsiteCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("RegisterWebsiteCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha NotiWebsiteCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("NotiWebsiteCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha RegisterAppCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("RegisterAppCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha NotiAppCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("NotiAppCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha RegisterDKDGTNCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("RegisterDKDGTNCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha UpdateWebsiteCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("UpdateWebsiteCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha UpdateAppCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("UpdateAppCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha ChangeAccountInfoUserCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("ChangeAccountInfoUserCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha ChangePasswordUserCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("ChangePasswordUserCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCode";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha WebsiteReportCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("WebsiteReportCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCodeWeb";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha WebsiteReportRightCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("WebsiteReportRightCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCodeWebRight";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha AppReportCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("AppReportCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCodeApp";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
        public static MvcCaptcha AppReportRightCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("AppReportRightCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaCodeAppRight";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }

        public static MvcCaptcha UpdatePasswordCaptcha()
        {
            // create the control instance 
            MvcCaptcha registrationCaptcha = new MvcCaptcha("UpdatePasswordCaptcha");

            // set up client-side processing of the Captcha code input textbox 
            registrationCaptcha.UserInputID = "CaptchaUpdatePass";
            registrationCaptcha.CodeLength = 5;

            registrationCaptcha.UseSmallIcons = true;

            // Captcha settings 
            registrationCaptcha.ImageSize = new System.Drawing.Size(150, 50);

            return registrationCaptcha;
        }
    }

}