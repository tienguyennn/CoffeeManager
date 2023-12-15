using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Mvc;

/// <summary>
///  author:nguyennt
///  description: null conditional
/// </summary>
public static class NullConditional
{
    public static T NotNull<T>(this T value) where T : new()
    {
        if (value != null)
            return value;
        else
        {
            var type = typeof(T);
            //type is nullable
            var typeNotNullable = Nullable.GetUnderlyingType(type);
            if (typeNotNullable != null)
            {
                return (T)Activator.CreateInstance(typeNotNullable);
            }

            return new T();
        }
    }

    public static bool IsNull(this object value)
    {
        return value == null;
    }
    public static bool IsNotNull(this object value)
    {
        return value != null;
    }

    public static string ToStringTTA(this object value)
    {
        if (value != null)
            return value.ToString();
        else
        {
            return string.Empty;
        }
    }

    public static T FirstOrNew<T>(this IEnumerable<T> source) where T : new()
    {
        var first = source.FirstOrDefault();
        if (first.IsNotNull())
            return first;
        return new T();
    }

    public static T FirstOrNew<T>(this IEnumerable<T> source, Func<T, bool> selector) where T : new()
    {
        foreach (var item in source)
        {
            if (selector(item))
            {
                return item;
            }
        }
        return new T();
    }

    public static IEnumerable<T> Update<T, TSet>(this IEnumerable<T> source, Expression<Func<T, TSet>> expression, TSet value)
    {
        foreach (T element in source)
        {
            var member = (MemberExpression)expression.Body;
            var prop = element.GetType().GetProperty(member.Member.Name);
            prop.SetValue(element, value, null);
            yield return element;
        }
    }

}

