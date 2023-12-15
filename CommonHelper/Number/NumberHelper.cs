using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonHelper.Number
{
    public static class NumberHelper
    {
        public static List<int> ListIntToPercent(this List<int> objInt)
        {
            var result = new List<int>();
            int total = objInt.Sum();
            if (total != 0)
            {
                int onePercent = 100 / total;
                for (int i = 0; i < objInt.Count(); i++)
                {
                    int percentElement = onePercent * objInt[i];
                    result.Add(percentElement);
                }
                return result;
            }
            return result;
        }
        public static int ByteToMegaByte(this int objInt)
        {
            var result = objInt * 1024 * 1024;
            return result;
        }

        public static double ToInt(this double objDouble)
        {
            return (int)Math.Round(objDouble);
        }
        public static string ToRoman(this int number)
        {
            if ((number < 0) || (number > 3999)) throw new ArgumentOutOfRangeException("insert value betwheen 1 and 3999");
            if (number < 1) return string.Empty;
            if (number >= 1000) return "M" + ToRoman(number - 1000);
            if (number >= 900) return "CM" + ToRoman(number - 900);
            if (number >= 500) return "D" + ToRoman(number - 500);
            if (number >= 400) return "CD" + ToRoman(number - 400);
            if (number >= 100) return "C" + ToRoman(number - 100);
            if (number >= 90) return "XC" + ToRoman(number - 90);
            if (number >= 50) return "L" + ToRoman(number - 50);
            if (number >= 40) return "XL" + ToRoman(number - 40);
            if (number >= 10) return "X" + ToRoman(number - 10);
            if (number >= 9) return "IX" + ToRoman(number - 9);
            if (number >= 5) return "V" + ToRoman(number - 5);
            if (number >= 4) return "IV" + ToRoman(number - 4);
            if (number >= 1) return "I" + ToRoman(number - 1);
            throw new ArgumentOutOfRangeException("something bad happened");
        }
    }
}
