using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using Autofac;

namespace Modules
{
    public class WebModule : Autofac.Module
    {

        protected override void Load(ContainerBuilder builder)
        {

            builder.RegisterAssemblyTypes(Assembly.Load("Web"))

                      .Where(t => t.Name.EndsWith("Provider"))

                      .AsImplementedInterfaces()

                      .InstancePerLifetimeScope();
           


        }

    }
}