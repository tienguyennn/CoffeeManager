using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.NotificationRepository;
using Service.NotificationService.Dto;
using Service.Common;
using System.Linq.Dynamic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList;
using AutoMapper;
using Repository.AppUserRepository;
using CommonHelper.ObjectExtention;

namespace Service.NotificationService
{
    public class NotificationService : EntityService<Notification>, INotificationService
    {
        IUnitOfWork _unitOfWork;
        INotificationRepository _NotificationRepository;
        IAppUserRepository _appUserRepository;
        ILog _loger;
        IMapper _mapper;


        public NotificationService(IUnitOfWork unitOfWork,
        INotificationRepository NotificationRepository,
        IAppUserRepository appUserRepository,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, NotificationRepository)
        {
            _unitOfWork = unitOfWork;
            _NotificationRepository = NotificationRepository;
            _loger = loger;
            _mapper = mapper;
            _appUserRepository = appUserRepository;

        }
        /// <summary>
        /// Lưu thông báo khi gửi cho nhiều người cùng một nội dung
        /// </summary>
        /// <param name="noti">Notification nội dung gửi đi</param>
        /// <param name="appUsers">Danh sách người nhận</param>
        /// <returns></returns>
        public List<Notification> CreateMulti(Notification noti, List<long> appUsers)
        {
            var lstNotification = new List<Notification>();
            try
            {
                if (appUsers != null && appUsers.Any())
                {
                    foreach (var item in appUsers)
                    {
                        var newNoti = new Notification();
                        newNoti.IsRead = noti.IsRead;
                        newNoti.Link = noti.Link;
                        newNoti.Message = noti.Message;
                        newNoti.ToUser = item;
                        newNoti.Type = noti.Type;
                        newNoti.FromUser = noti.FromUser;
                        _NotificationRepository.Add(newNoti);
                        lstNotification.Add(newNoti);
                    }
                    _unitOfWork.Commit();

                }
                return lstNotification;
            }
            catch (Exception ex)
            {
                _loger.Error("Lỗi khi thêm mới notification gửi cho nhiều người " + ex.Message, ex);
                return new List<Notification>(); ;
            }
            return lstNotification;

        }
        public PageListResultBO<NotificationDto> GetDaTaByPage(long? userId, NotificationSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from Notificationtbl in _NotificationRepository.GetAllAsQueryable()
                        where Notificationtbl.ToUser == userId
                        join userFromtbl in _appUserRepository.GetAllAsQueryable() on Notificationtbl.FromUser equals userFromtbl.Id into jfromuser
                        from userFromInfo in jfromuser.DefaultIfEmpty()
                        select new NotificationDto
                        {
                            CreatedDate = Notificationtbl.CreatedDate,
                            UpdatedDate = Notificationtbl.UpdatedDate,
                            IsRead = Notificationtbl.IsRead,
                            Id = Notificationtbl.Id,
                            FromUser = Notificationtbl.FromUser,
                            ToUser = Notificationtbl.ToUser,
                            Message = Notificationtbl.Message,
                            Link = Notificationtbl.Link,
                            Type = Notificationtbl.Type,
                            CreatedBy = Notificationtbl.CreatedBy,
                            UpdatedBy = Notificationtbl.UpdatedBy,
                            FromUserInfo = userFromInfo,
                            FromUserName = userFromInfo.FullName
                        };

            if (searchModel != null)
            {

                if (searchModel.FromUserFilter != null)
                {
                    query = query.Where(x => x.FromUser == searchModel.FromUserFilter);
                }
                if (searchModel.ToUserFilter != null)
                {
                    query = query.Where(x => x.ToUser == searchModel.ToUserFilter);
                }

                if (!string.IsNullOrEmpty(searchModel.FromUserNameFilter))
                {
                    searchModel.FromUserNameFilter = searchModel.FromUserNameFilter;
                    query = query.Where(x => x.FromUserName.Trim().ToLower().Contains(searchModel.FromUserNameFilter));
                }

                if (!string.IsNullOrEmpty(searchModel.MessageFilter))
                {
                    query = query.Where(x => x.Message.Contains(searchModel.MessageFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.TypeFilter))
                {
                    query = query.Where(x => x.Type.Contains(searchModel.TypeFilter));
                }


                if (!string.IsNullOrEmpty(searchModel.sortQuery))
                {
                    query = query.OrderBy(searchModel.sortQuery);
                }
                else
                {
                    query = query.OrderByDescending(x => x.Id);
                }
            }
            else
            {
                query = query.OrderByDescending(x => x.Id);
            }
            var resultmodel = new PageListResultBO<NotificationDto>();
            if (pageSize == -1)
            {
                var dataPageList = query.ToList();
                resultmodel.Count = dataPageList.Count;
                resultmodel.TotalPage = 1;
                resultmodel.ListItem = dataPageList;
            }
            else
            {
                var dataPageList = query.ToPagedList(pageIndex, pageSize);
                resultmodel.Count = dataPageList.TotalItemCount;
                resultmodel.TotalPage = dataPageList.PageCount;
                resultmodel.ListItem = dataPageList.ToList();
            }
            return resultmodel;
        }

        public Notification GetById(long id)
        {
            return _NotificationRepository.GetById(id);
        }

        public List<Notification> GetListIdNoti(long? userID)
        {
            var query = (from Notificationtbl in _NotificationRepository.GetAllAsQueryable()
                         where (Notificationtbl.IsRead != true && Notificationtbl.ToUser == userID)

                         select Notificationtbl
                         ).ToList();


            return query;
        }


        public PageListResultBO<Notification> GetByUserId(long? id, int amount = 10, int page = 1)
        {
            var listNotif = _NotificationRepository.GetAllAsQueryable().Where(x => x.ToUser == id && x.IsRead != true)
                .OrderByDescending(x => x.CreatedDate)
                .ToPagedList(page, amount);
            var countUnRead = listNotif
                .Count();
            return new PageListResultBO<Notification>()
            {
                Count = listNotif.TotalItemCount,
                CurrentPage = page,
                ListItem = listNotif.ToList(),
                TotalPage = listNotif.PageCount,
            };
        }

        public PageListResultBO<NotificationDto> GetAllByUserId(long? id, int amount = 10)
        {
            var listNofitiaction = (from Notificationtbl in _NotificationRepository.GetAllAsQueryable()
                                    where Notificationtbl.ToUser == id
                                    join userFromtbl in _appUserRepository.GetAllAsQueryable() on Notificationtbl.FromUser equals userFromtbl.Id into jfromuser
                                    from userFromInfo in jfromuser.DefaultIfEmpty()
                                    select new NotificationDto
                                    {
                                        CreatedDate = Notificationtbl.CreatedDate,
                                        UpdatedDate = Notificationtbl.UpdatedDate,
                                        IsRead = Notificationtbl.IsRead,
                                        Id = Notificationtbl.Id,
                                        FromUser = Notificationtbl.FromUser,
                                        ToUser = Notificationtbl.ToUser,
                                        Message = Notificationtbl.Message,
                                        Link = Notificationtbl.Link,
                                        Type = Notificationtbl.Type,
                                        CreatedBy = userFromInfo.FullName,
                                        UpdatedBy = Notificationtbl.UpdatedBy,
                                        FromUserInfo = userFromInfo
                                    }).OrderByDescending(x => x.CreatedDate)
                .ToPagedList(1, amount);
            return new PageListResultBO<NotificationDto>()
            {
                Count = listNofitiaction.TotalItemCount,
                CurrentPage = 1,
                ListItem = listNofitiaction.ToList(),
                TotalPage = listNofitiaction.PageCount
            };
        }

        public PageListResultBO<NotificationDto> GetAllByUserIdUnReadFirst(long? id, int amount = 10, int pageIndex = 1)
        {
            var listNofitiaction = (from Notificationtbl in _NotificationRepository.GetAllAsQueryable()
                                    where Notificationtbl.ToUser == id && Notificationtbl.IsRead == false
                                    join userFromtbl in _appUserRepository.GetAllAsQueryable() on Notificationtbl.FromUser equals userFromtbl.Id into jfromuser
                                    from userFromInfo in jfromuser.DefaultIfEmpty()
                                    select new NotificationDto
                                    {
                                        CreatedDate = Notificationtbl.CreatedDate,
                                        UpdatedDate = Notificationtbl.UpdatedDate,
                                        IsRead = Notificationtbl.IsRead,
                                        Id = Notificationtbl.Id,
                                        FromUser = Notificationtbl.FromUser,
                                        ToUser = Notificationtbl.ToUser,
                                        Message = Notificationtbl.Message,
                                        Link = Notificationtbl.Link,
                                        Type = Notificationtbl.Type,
                                        CreatedBy = userFromInfo.FullName,
                                        UpdatedBy = Notificationtbl.UpdatedBy,
                                        FromUserInfo = userFromInfo
                                    }).OrderByDescending(x => x.Id)
                .ToPagedList(pageIndex, amount);
            return new PageListResultBO<NotificationDto>()
            {
                Count = listNofitiaction.TotalItemCount,
                CurrentPage = pageIndex,
                ListItem = listNofitiaction.ToList(),
                TotalPage = listNofitiaction.PageCount
            };

        }

        public int CountUnReadByUserId(long? id)
        {
            var result = _NotificationRepository.GetAllAsQueryable().Where(x => x.ToUser == id && x.IsRead == false).Count();
            return result;
        }

        public string GetMessageByLinkAndToUser(string link, long? toUser)
        {
            var result = "";
            var query = _NotificationRepository.GetAllAsQueryable().Where(x => x.Link == link && x.ToUser == toUser).OrderByDescending(x => x.Id).FirstOrDefault();
            if (query != null)
            {
                result = query.Message;
            }
            return result;
        }

        public int CountUnReadByFrontEndUserId(int idMoitUser)
        {
            var result = _NotificationRepository.GetAllAsQueryable().Where(x => x.ToUser == idMoitUser && x.IsRead != true && x.SendToFrontEndUser == true && x.IsDelete != true).Count();
            return result;
        }

        public List<Notification> GetListNotiFrontEndUserId(int idMoitUser)
        {
            var query = (from Notificationtbl in _NotificationRepository.GetAllAsQueryable()
                         where (Notificationtbl.ToUser == idMoitUser && Notificationtbl.SendToFrontEndUser == true && Notificationtbl.IsDelete != true)
                         orderby Notificationtbl.Id descending
                         select Notificationtbl
                         ).ToList();
            return query;
        }

        /// <summary>
        /// @author:duynn
        /// @since: 16/07/2021
        /// </summary>
        /// <param name="entityThongBao"></param>
        /// <param name="idDotKeKhai"></param>
        public void SendThongBaoTiepNhanHoSoKeKhai(Notification entityThongBao, long idDotKeKhai)
        {
            entityThongBao.IsRead = false;
            entityThongBao.ItemId = (int)idDotKeKhai;
            entityThongBao.ItemType = Service.Common.Constant.ITEMTYPE.DOTKEKHAI;
            entityThongBao.Link = $"/KeKhaiArea/ThucHienKeKhai/OverviewDotKeKhai?idDotKeKhai={idDotKeKhai}";
            _NotificationRepository.Add(entityThongBao);
        }

        /// <summary>
        /// @author:duynn
        /// @since: 16/07/2021
        /// </summary>
        /// <param name="entityThongBao"></param>
        /// <param name="idsNguoiNhan"></param>
        /// <param name="idHoSo"></param>

        public NotificationDto GetChiTietThongBao(long id)
        {
            var entityThongBao = _NotificationRepository.GetById(id);
            if (entityThongBao != null && entityThongBao.IsRead != true)
            {
                entityThongBao.IsRead = true;
                _NotificationRepository.Save();
            }

            var result = (from Notificationtbl in _NotificationRepository.GetAllAsQueryable()
                          where Notificationtbl.Id == id
                          join userFromtbl in _appUserRepository.GetAllAsQueryable() on
                          Notificationtbl.FromUser equals userFromtbl.Id into jfromuser
                          from userFromInfo in jfromuser.DefaultIfEmpty()
                          select new NotificationDto
                          {
                              CreatedDate = Notificationtbl.CreatedDate,
                              UpdatedDate = Notificationtbl.UpdatedDate,
                              IsRead = Notificationtbl.IsRead,
                              Id = Notificationtbl.Id,
                              FromUser = Notificationtbl.FromUser,
                              ToUser = Notificationtbl.ToUser,
                              Message = Notificationtbl.Message,
                              Link = Notificationtbl.Link,
                              Type = Notificationtbl.Type,
                              CreatedBy = Notificationtbl.CreatedBy,
                              UpdatedBy = Notificationtbl.UpdatedBy,
                              FromUserInfo = userFromInfo,
                              FromUserName = userFromInfo.FullName
                          }).FirstOrEmpty();
            return result;
        }
    }
}
