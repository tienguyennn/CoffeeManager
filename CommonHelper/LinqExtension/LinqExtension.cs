using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace System.Linq
{
    public static class LinqExtension
    {

        public static IEnumerable<T> Update<T, TUpdate>(this IEnumerable<T> source, Expression<Func<T, TUpdate>> expression, TUpdate value)
        {
            foreach (T element in source)
            {
                var member = (MemberExpression)expression.Body;
                var prop = element.GetType().GetProperty(member.Member.Name);
                prop.SetValue(element, value, null);
                yield return element;
            }
        }

        public static IEnumerable<T> Update<T, TUpdate>(this IEnumerable<T> source, Expression<Func<T, TUpdate>> expression, Func<T, TUpdate> set)
        {
            foreach (T element in source)
            {
                var member = (MemberExpression)expression.Body;
                var prop = element.GetType().GetProperty(member.Member.Name);
                var value = set(element);
                prop.SetValue(element, value, null);
                yield return element;
            }
        }

        public static IEnumerable<T> Replace<T>(this IEnumerable<T> source, Func<T, bool> expression, T value)
        {
            foreach (T element in source)
            {
                if (expression(element))
                {
                    yield return value;
                    continue;
                }
                yield return element;
            }
        }

        public static int IndexOf<T>(this IEnumerable<T> source, Func<T, bool> expression)
        {
            var index = 0;
            foreach (T element in source)
            {
                if (expression(element))
                {
                    return index;
                }
                index++;
            }
            return -1;
        }

        public static T FirstOrNew<T>(this IEnumerable<T> source) where T : new()
        {
            return source.FirstOrDefault().NotNull();
        }
        public static T FirstOrNew<T>(this IEnumerable<T> source, Func<T, bool> predicate) where T : new()
        {
            return source.FirstOrDefault(predicate).NotNull();
        }

        public static void ForEach<T>(this List<T> source, Action<T, int> action)
        {
            if (source != null)
            {
                var count = source.Count;
                for (int i = 0; i < count; i++)
                {
                    action.Invoke(source[i], i);
                }
            }
        }

        public static List<TResult> ForEach<T, TResult>(this List<T> source, Func<T, int, TResult> action)
        {
            if (source != null)
            {
                var result = new List<TResult>();
                var count = source.Count;
                for (int i = 0; i < count; i++)
                {
                    result.Add(action.Invoke(source[i], i));
                }
                return result;
            }
            return null;
        }

    }
}
