using Model.IdentityEntities;
using Model.Entities;
using Service.NotificationService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.NotificationService
{
    public interface INotificationService : IEntityService<Notification>
    {
        PageListResultBO<NotificationDto> GetDaTaByPage(long? userId, NotificationSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        Notification GetById(long id);
        PageListResultBO<Notification> GetByUserId(long? id,int amount,int page = 1);
        PageListResultBO<NotificationDto> GetAllByUserId(long? id, int amount = 10);
        PageListResultBO<NotificationDto> GetAllByUserIdUnReadFirst(long? id, int amount = 10, int pageIndex = 1);
        int CountUnReadByUserId(long? id);
        /// <summary>
        /// Lưu thông báo khi gửi cho nhiều người cùng một nội dung
        /// </summary>
        /// <param name="noti">Notification nội dung gửi đi</param>
        /// <param name="appUsers">Danh sách người nhận</param>
        /// <returns></returns>
        List<Notification> CreateMulti(Notification noti, List<long> appUsers);
        string GetMessageByLinkAndToUser(string link, long? toUser);
        List<Notification> GetListIdNoti(long? userID);
        int CountUnReadByFrontEndUserId(int idMoitUser);
        List<Notification> GetListNotiFrontEndUserId(int idMoitUser);




        NotificationDto GetChiTietThongBao(long id);
    }
}
