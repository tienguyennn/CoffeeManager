using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Core
{
    public class LongModelBinder : DefaultModelBinder
    {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            if (valueProviderResult==null)
            {
                return null;
            }

            return (valueProviderResult != null && string.IsNullOrEmpty(valueProviderResult.AttemptedValue)) ? base.BindModel(controllerContext, bindingContext) : Convert.ToInt64(valueProviderResult.AttemptedValue.Replace(".", ""));
            // of course replace with your custom conversion logic
        }
    }
}