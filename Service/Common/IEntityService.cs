using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Model;

namespace Service
{
    public interface IEntityService<T> : IService
     where T : class
    {
        void Create(T entity);
        void Delete(T entity);
        void SoftDelete(T entity);
        void DeleteRange(IEnumerable<T> entities);

        void InsertRange(IEnumerable<T> entities);

        void UpdateRange(IEnumerable<T> entities);


        void Delete(Expression<Func<T, bool>> filter);
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAllNoTracking();

        void Update(T entity);
        T GetById(object id);
        T GetEmptyIfNullById(object id);
        void Save(T entity);

        List<SelectListItem> GetDropdown(string displayMember, string valueMember, object selected = null, bool autoSelect = false);

        List<SelectListItem> GetDropDownMultiple(string displayMember, string valueMember, List<object> selected = null);
        List<SelectListItem> GetDropDownMultiple<TValue>(string displayMember, string valueMember, List<TValue> selected = null) where TValue : IComparable;
        List<object> GetListFieldValue(string fieldName);
        List<SelectListItem> GetDropdownFields(object selected = null);
        List<T> GetEntitiesByFieldValue(string fieldName, object value);
        List<T> GetEntitiesByMultipleFieldValue(params KeyValuePair<string, object>[] groupKeyValue);

        void ExecuteNonQuery(string query);

        List<T> GetEntitiesByQuery(string query);
    }
}
