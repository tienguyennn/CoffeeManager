using System;

namespace Web.Core.CustomAttribute
{
    public class UploadFileAttribute : Attribute
    {
        public string Type;
        public UploadFileAttribute(string type)
        {
            Type = type;
        }
    }
}