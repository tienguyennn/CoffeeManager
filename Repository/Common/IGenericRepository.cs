using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Model;
using System.Data.Entity;
namespace Repository
{
    public interface IGenericRepository<T> where T : class
    {
        DbContext GetContext();

        IDbSet<T> DBSet();
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAllNoTracking();

        IQueryable<T> GetAllAsQueryable();
        IQueryable<T> GetQueryable();
        IQueryable<T> Where(Expression<Func<T, bool>> predicate);
        T FirstOrDefault(Expression<Func<T, bool>> predicate);
        bool Any(Expression<Func<T, bool>> predicate);
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        IQueryable<T> FindByAsQueryable(Expression<Func<T, bool>> predicate);
        T Add(T entity);
        T Delete(T entity);
        void SoftDelete(T entity);
        void Edit(T entity);
        void Save();
        T GetById(object id);
        T GetEmptyIfNullById(object id);

        T FindEmptyIfNullByExp(Expression<Func<T, bool>> predicate);

        void DeleteRange(IEnumerable<T> entities);

        void Delete(Expression<Func<T, bool>> filter);

        void InsertRange(IEnumerable<T> entities);

        void UpdateRange(IEnumerable<T> entities);


        List<SelectListItem> GetDropdown(string displayMember, string valueMember, object selected = null, bool autoSelect = false);
        List<SelectListItem> GetDropdown<TDisplay>(Expression<Func<T, TDisplay>> expressionDisplay, string valueMember, object selected = null, bool autoSelect = false);
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
