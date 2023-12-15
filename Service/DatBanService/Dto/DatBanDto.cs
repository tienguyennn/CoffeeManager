using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Common;
using Service.Constant;

namespace Service.DatBanService.Dto
{
    public class DatBanDto : DatBan
    {
        public string TrangThaiText => ConstantExtension.GetName<TrangThaiConstant>(TrangThai);
    }
}