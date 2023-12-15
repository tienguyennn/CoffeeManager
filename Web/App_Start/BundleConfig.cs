using System.Web;
using System.Web.Optimization;

namespace Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*")
                        .Include("~/Scripts/AdditionValidation.js")
                        //config custom validation scripts
                        );
            bundles.Add(new ScriptBundle("~/bundles/jqueryClientValidate").Include(
                        "~/Scripts/jquery.validate.js")
                        //config custom validation scripts
                        );

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/assets/appcss")
                .Include("~/assets/css/bootstrap.min.css")
                .Include("~/assets/font-awesome/4.5.0/css/font-awesome.min.css")
                .Include("~/assets/css/fonts.googleapis.com.css")
                .Include("~/assets/css/ace-skins.min.css")
                .Include("~/assets/css/ace-rtl.min.css")
                .Include("~/Content/hinet-table.css")
                .Include("~/assets/css/jquery.gritter.min.css")
                .Include("~/Content/jquery.timepicker.min.css")
                .Include("~/assets/css/select2.min.css")
                .Include("~/assets/css/jquery-confirm.css")
                .Include("~/Content/responsive-dti.css")
                );

            bundles.Add(new StyleBundle("~/assets/EndUserCss")
            .Include("~/assets/css/bootstrap.min.css")
            .Include("~/assets/font-awesome/4.5.0/css/font-awesome.min.css")
            .Include("~/assets/css/fonts.googleapis.com.css")
            .Include("~/Content/hinet-table.css")
            .Include("~/assets/css/jquery.gritter.min.css")
            .Include("~/assets/css/select2.min.css")
            .Include("~/assets/css/jquery-confirm.css")
            .Include("~/Content/EndUser/css/style.css")
            .Include("~/Content/EndUser/css/style.css")
            .Include("~/Content/EndUser/css/styleRespon.css")
            .Include("~/Content/EndUser/css/animate.min.css")
            .Include("~/Content/cssNew.css")
            );
            bundles.Add(new ScriptBundle("~/assets/EndUserjs")
             .Include("~/assets/js/jquery-2.1.4.min.js")
             .Include("~/assets/js/bootstrap.min.js")
             .Include("~/assets/js/bootstrap-multiselect.min.js")
             .Include("~/assets/js/jquery-ui.custom.min.js")
             .Include("~/Scripts/jquery.unobtrusive-ajax.js")
             .Include("~/assets/js/jquery.ui.touch-punch.min.js")
             .Include("~/assets/js/jquery.easypiechart.min.js")
             .Include("~/assets/js/jquery.sparkline.index.min.js")
             .Include("~/assets/js/jquery.flot.min.js")
             .Include("~/assets/js/jquery.flot.pie.min.js")
             //.Include("~/assets/js/jquery.flot.resize.min.js")
             .Include("~/assets/js/jquery.gritter.min.js")
             .Include("~/assets/js/bootbox.js")
             .Include("~/assets/js/chosen.jquery.min.js")
             .Include("~/Scripts/jquery.validate*")
             .Include("~/Scripts/jquery-hinet-table.js")
             .Include("~/Scripts/UploadTool.js")
             .Include("~/assets/js/select2.min.js")
              .Include("~/Scripts/AutoNumeric/autoNumeric.min.js")
              .Include("~/Scripts/OldAutoNumeric/autoNumeric.min.js")
             .Include("~/assets/js/jquery-confirm.js")
             .Include("~/Scripts/Common.js")

             .Include("~/Content/EndUser/js/wow.min.js")
             .Include("~/Content/EndUser/js/scroll-top.js")
             );

            bundles.Add(new ScriptBundle("~/assets/appjs")
                .Include("~/assets/js/jquery-2.1.4.min.js")
                .Include("~/assets/js/bootstrap.min.js")
                .Include("~/assets/js/jquery-ui.custom.min.js")
                .Include("~/Scripts/jquery.unobtrusive-ajax.js")
                .Include("~/assets/js/jquery.ui.touch-punch.min.js")
                .Include("~/assets/js/jquery.easypiechart.min.js")
                .Include("~/assets/js/jquery.sparkline.index.min.js")
                .Include("~/assets/js/jquery.flot.min.js")
                .Include("~/assets/js/jquery.flot.pie.min.js")
                //.Include("~/assets/js/jquery.flot.resize.min.js")
                .Include("~/assets/js/ace-elements.min.js")
                .Include("~/assets/js/ace.min.js")
                .Include("~/assets/js/jquery.gritter.min.js")
                .Include("~/assets/js/bootbox.js")
                .Include("~/assets/js/chosen.jquery.min.js")
                .Include("~/Scripts/jquery.validate*")
                //.Include("~/Scripts/jquery-hinet-table.js")
                .Include("~/Scripts/LayoutAce.js")
                .Include("~/Scripts/UploadTool.js")
                .Include("~/assets/js/select2.min.js")
                .Include("~/assets/js/jquery-confirm.js")
                .Include("~/Scripts/AutoNumeric/autoNumeric.min.js")
                .Include("~/Scripts/OldAutoNumeric/autoNumeric.js")
                //.Include("~/assets/ckeditor/ckeditor.js")
                //.Include("~/content/go.js")
                .Include("~/Scripts/Common.js")
                .Include("~/Scripts/RoleExtention.js")
                .Include("~/assets/ChartJS/Chart.min.js")
                );
            bundles.Add(new ScriptBundle("~/bundles/datepicker").Include(
           "~/Scripts/bootstrap-datepicker.js",
           "~/Scripts/jquery.timepicker.min.js",

           "~/Scripts/locales/bootstrap-datepicker.*"));

            bundles.Add(new StyleBundle("~/Content/datepicker").Include(
                "~/Content/jquery.timepicker.min.css",
            "~/Content/bootstrap-datepicker.css"));

            var mapBoxPath = "https://api.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.js";

            bundles.Add(new ScriptBundle("~/bundles/v1.4.1", mapBoxPath)
                   .Include("~/Scripts/mapbox-gl.js")
                   .Include("~/assets/mapbox-gl.css"));

            var mapBoxGeoCoderPath = "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.min.js";

            bundles.Add(new ScriptBundle("~/bundles/v4.4.2", mapBoxGeoCoderPath)
                   .Include("~/Scripts/mapbox-gl-geocoder.min.js")
                   .Include("~/assets/mapbox-gl-geocoder.css"));

            bundles.Add(new ScriptBundle("~/bundles/file-action")
                .Include("~/Scripts/file-action.js"));

            bundles.Add(new ScriptBundle("~/bundles/file-multiple-upload")
                .Include("~/Scripts/upload-multiple-files.js"));

            bundles.Add(new ScriptBundle("~/bundles/configform")
               .Include("~/Scripts/config-form-{version}.js"));

            bundles.Add(new ScriptBundle("~/khaosat/js")
             .Include("~/Content/LibUploadFile/minify/jquery.uploadfile.min.js"));

            bundles.Add(new StyleBundle("~/khaosat/css")
             .Include("~/Content/LibUploadFile/minify/uploadfile.min.css"));

            bundles.Add(new StyleBundle("~/assets/select2css")
                .Include("~/assets/css/select2.min.css"));
            bundles.Add(new ScriptBundle("~/assets/select2js")
                .Include("~/assets/js/select2.min.js"));


            //sắp xếp bundles theo thứ tự không theo bảng chữ cái (mặc định)
            bundles.FileSetOrderList.Clear();
        }
    }
}
