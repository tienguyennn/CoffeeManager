using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hinet.Web.MobileCA
{
    public class InfoChuKySo
    {
        public string Path { get; set; }
        public float PositionX { get; set; }
        public float PositionY { get; set; }


        public InfoChuKySo()
        {

        }

        public InfoChuKySo(string path, float positionX, float positionY)
        {
            Path = path;
            PositionX = positionX;
            PositionY = positionY;
        }
    }
}