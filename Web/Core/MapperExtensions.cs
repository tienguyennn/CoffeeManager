using AutoMapper;
using BotDetect.C5;
using DocumentFormat.OpenXml.Drawing;
using Model.Entities;
using Web.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Security.Cryptography;
using System.Web;

namespace Web.Core
{
    public static class MapperExtensions
    {
        private static void IgnoreUnmappedProperties(TypeMap map, IMappingExpression expr)
        {
            foreach (string propName in map.GetUnmappedPropertyNames())
            {
                if (map.SourceType.GetProperty(propName) != null)
                {
                    expr.ForSourceMember(propName, opt => opt.Ignore());
                }
                if (map.DestinationType.GetProperty(propName) != null)
                {
                    expr.ForMember(propName, opt => opt.Ignore());
                }
            }
        }

        public static void IgnoreUnmapped(this IProfileExpression profile)
        {
            profile.ForAllMaps(IgnoreUnmappedProperties);
        }

        public static void IgnoreUnmapped(this IProfileExpression profile, Func<TypeMap, bool> filter)
        {
            profile.ForAllMaps((map, expr) =>
            {
                if (filter(map))
                {
                    IgnoreUnmappedProperties(map, expr);
                }
            });
        }

        public static void IgnoreUnmapped(this IProfileExpression profile, Type src, Type dest)
        {
            profile.IgnoreUnmapped((TypeMap map) => map.SourceType == src && map.DestinationType == dest);
        }

        public static void IgnoreUnmapped<TSrc, TDest>(this IProfileExpression profile)
        {
            profile.IgnoreUnmapped(typeof(TSrc), typeof(TDest));
        }

        public static TDest NMap<TSource, TDest>(this IMapper mapper, TSource source, TDest destination)
        {
            var dest = mapper.Map<TSource, TDest>(source, destination);
            return NMap(dest, source);
        }
        public static TDest NMap<TDest>(this IMapper mapper, object source)
        {
            var dest = mapper.Map<TDest>(source);
            return NMap(dest, source);
        }

        private static TDest NMap<TDest>(TDest dest, object source)
        {
            var sourceProps = source.GetType().GetProperties();
            var destProps = typeof(TDest).GetProperties();

            var diffProps = destProps.Where(x => sourceProps.Any(y => y.PropertyType != x.PropertyType
                                                && x.Name == y.Name)).ToList();
            if (diffProps.Any())
            {
                var typeString = typeof(string);
                var typeList = typeof(List<>);
                var typeUpload = typeof(UploadToolVM);
                foreach (var diffProp in diffProps)
                {
                    if (diffProp.PropertyType == typeString)
                    {
                        var sourceProp = sourceProps.First(x => x.Name == diffProp.Name);
                        if (sourceProp.PropertyType.GetGenericTypeDefinition() == typeList)
                        {
                            var sourceValue = sourceProp.GetValue(source) as IList;
                            if (sourceValue.Any())
                            {
                                var value = ",";
                                foreach (var item in sourceValue)
                                {
                                    value += item.ToString() + ",";
                                }
                                diffProp.SetValue(dest, value);
                            }
                        }
                        //else if (sourceProp.PropertyType == typeUpload)
                        //{
                        //    var sourceValue = sourceProp.GetValue(source) as UploadToolVM;
                        //    if (sourceValue != null)
                        //    {
                        //        diffProp.SetValue(dest, sourceValue.DBValue);
                        //    }
                        //}
                    }
                    else if (diffProp.PropertyType.IsGenericType && diffProp.PropertyType.GetGenericTypeDefinition() == typeList)
                    {
                        var sourceProp = sourceProps.First(x => x.Name == diffProp.Name);
                        if (sourceProp.PropertyType == typeString)
                        {
                            var sourceValue = sourceProp.GetValue(source);
                            var typeIn = diffProp.PropertyType.GetGenericArguments()[0];
                            if (sourceValue != null)
                            {
                                var value = sourceValue.ToString().Split(',').Where(x => !string.IsNullOrEmpty(x))
                                    .Select(x => Convert.ChangeType(x, typeIn)).ToList();
                                var ilist = (IList)Activator.CreateInstance(diffProp.PropertyType);
                                foreach (var item in value)
                                {
                                    ilist.Add(item);
                                }
                                diffProp.SetValue(dest, ilist);
                            }
                        }
                    }
                    //else if (diffProp.PropertyType == typeUpload)
                    //{
                    //    var sourceProp = sourceProps.First(x => x.Name == diffProp.Name);
                    //    if (sourceProp.PropertyType == typeString)
                    //    {
                    //        var sourceValue = sourceProp.GetValue(source);
                    //        var destValue = diffProp.GetValue(dest) as UploadToolVM;
                    //        if(destValue != null && sourceValue != null)
                    //        {
                    //            destValue.DBValue = sourceValue.ToString();
                    //            diffProp.SetValue(dest, destValue);
                    //        }
                    //    }
                    //}
                }
            }
            return dest;
        }
    }
}