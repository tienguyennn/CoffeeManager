using Autofac;
using AutoMapper;
using AutoMapper.Configuration;
using Model.Entities;

using Web.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Core;


namespace Web.Modules
{
    public class AutoMapperModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();
            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => typeof(Profile).IsAssignableFrom(t) && !t.IsAbstract && t.IsPublic)
                .As<Profile>();

            builder.Register(c => new MapperConfiguration(cfg =>
            {
                foreach (var profile in c.Resolve<IEnumerable<Profile>>())
                {
                    cfg.AddProfile(profile);
                }
                cfg.AllowNullDestinationValues = true;
                cfg.ValidateInlineMaps = false;
                cfg.IgnoreUnmapped();
            })).AsSelf().SingleInstance();

            builder.Register(c => c.Resolve<MapperConfiguration>()
                .CreateMapper(c.Resolve))
                .As<IMapper>()
                .InstancePerLifetimeScope();
        }
    }
}