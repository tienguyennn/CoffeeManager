using Model.Entities;

namespace Web.Models
{
    public class ModelPage
    {
        //public PageListResultBO<QL_TINTUCDto> GetDaTaByPage { get; set; }
        //public QL_TINTUC GetById { get; set; }
        //public PageListResultBO<QL_TINTUCDto> GetThongBaoHome { get; internal set; }
    }
    public class ModelHome
    {
        //public PageListResultBO<QL_TINTUCDto> GetNewsHome { get; set; }
        //public PageListResultBO<QL_TINTUCDto> GetThongBaoHome { get; set; }
        //public PageListResultBO<DVC_DETAILDICHVUCONGDto> GetDVCHome { get; set; }

        public int SoLuongHoSoDaTiepNhan { get; set; }
        public int SoLuongHoSoDangGiaiQuyet { get; set; }
        public int SoLuongHoSoDaTraDan { get; set; }
    }
}