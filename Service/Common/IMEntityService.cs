using Model.MongoEntities;
using Service.AppUserService.Dto;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Service.Common
{
    public interface IMEntityService<T> : IService
    where T : class
    {
        void Create(T entity, UserDto currentUser);
        void CreateRange(List<T> lstentity, UserDto currentUser);
        void Delete(Guid Id);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);
        void DeleteRange(IEnumerable<Guid> lstID);
        void Update(T entity, UserDto currentUser);
        void Save(T entity, UserDto currentUser);
        List<T> GetAll();
        IQueryable<T> GetAllAsQueryable();
        IEnumerable<T> FindBy(Expression<Func<T, bool>> filtter);
        T GetById(Guid Id);
        List<T> GetByListId(List<Guid> lstId);
        List<object> GetListFieldValue(string fieldName);
        List<T> GetEntitiesByFieldValue(string fieldName, object value);
        List<T> GetEntitiesByMultipleFieldValue(params KeyValuePair<string, object>[] groupKeyValue);
        List<SelectListItem> GetDropdown(string displayMember, string valueMember, object selected = null);
    }
}
