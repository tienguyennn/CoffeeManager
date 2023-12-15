using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Mvc;
using CommonHelper.ObjectExtention;
using Model;
using Model.IdentityEntities;

namespace Repository
{
    public abstract class GenericRepository<T> : IGenericRepository<T>
       where T : class
    {
        protected DbContext _entities;
        protected readonly IDbSet<T> _dbset;

        public GenericRepository(DbContext context)
        {

            _entities = context;
            _dbset = context.Set<T>();
        }

        public GenericRepository()
        {
        }

        public virtual IDbSet<T> DBSet()
        {
            return _dbset;
        }
        public virtual IEnumerable<T> GetAll()
        {

            return _dbset.AsEnumerable<T>();
        }

        public virtual IEnumerable<T> GetAllNoTracking()
        {

            return _dbset.AsNoTracking().ToList();
        }

        public virtual IQueryable<T> GetAllAsQueryable()
        {
            //var lstInterFace = ((System.Reflection.TypeInfo)typeof(T).BaseType).ImplementedInterfaces;
            //if (lstInterFace != null && lstInterFace.Contains(typeof(IAuditableEntity)))
            //{
            //    return _dbset.AsQueryable<T>().Where(x => ((IAuditableEntity)x).IsDelete == false);
            //}
            return _dbset.AsQueryable<T>();
        }

        public IQueryable<T> Where(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            return _dbset.Where(predicate);
        }
        public T FirstOrDefault(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            return _dbset.FirstOrDefault(predicate);
        }

        public bool Any(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            return _dbset.Any(predicate);
        }
        public virtual IQueryable<T> GetQueryable()
        {
            return _dbset.AsQueryable<T>();
        }
        public IEnumerable<T> FindBy(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {

            IEnumerable<T> query = _dbset.Where(predicate).AsEnumerable();
            return query;
        }

        public IQueryable<T> FindByAsQueryable(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {

            IQueryable<T> query = _dbset.Where(predicate);
            return query;
        }


        public virtual T Add(T entity)
        {
            return _dbset.Add(entity);
        }

        public virtual T Delete(T entity)
        {
            return _dbset.Remove(entity);
        }

        public virtual void SoftDelete(T entity)
        {
            IAuditableEntity entityPa = entity as IAuditableEntity;
            if (entity != null)
            {
                string identityName = Thread.CurrentPrincipal.Identity.Name;
                var userId = _entities.Set<AppUser>().Where(x => x.UserName == identityName).Select(x => x.Id).FirstOrDefault();
                entityPa.IsDelete = true;
                entityPa.DeleteTime = DateTime.Now;
                entityPa.DeleteId = userId;
                _entities.Entry(entityPa).State = System.Data.Entity.EntityState.Modified;
                _entities.SaveChanges();
            }
        }


        public virtual void Edit(T entity)
        {
            _entities.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        }

        public virtual void Save()
        {
            _entities.SaveChanges();
        }

        public T GetById(object id)
        {
            return _dbset.Find(id);
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            foreach (var item in entities)
            {
                if (_entities.Entry(item).State == EntityState.Detached)
                {
                    _dbset.Attach(item);
                }
                _dbset.Remove(item);
            }
        }

        public List<SelectListItem> GetDropdown(string displayMember, string valueMember, object selected = null, bool autoSelect = false)
        {
            Type objType = typeof(T);
            List<SelectListItem> result = new List<SelectListItem>();
            var dbSet = this._dbset.ToList();
            if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
            {
                result = dbSet.Select(x => new SelectListItem()
                {
                    Value = objType.GetProperty(valueMember).GetValue(x) != null ? objType.GetProperty(valueMember).GetValue(x).ToString() : "",
                    Text = objType.GetProperty(displayMember).GetValue(x) != null ? objType.GetProperty(displayMember).GetValue(x).ToString() : "",
                    Selected = (selected != null) && selected.Equals(objType.GetProperty(valueMember).GetValue(x))
                }).ToList();
            }
            return result;
        }
        public List<SelectListItem> GetDropdown<TDisplay>(Expression<Func<T, TDisplay>> expressionDisplay, string valueMember, object selected = null, bool autoSelect = false)
        {
            Type objType = typeof(T);
            List<SelectListItem> result = new List<SelectListItem>();
            var dbSet = this._dbset.ToList();
            var displayMember = (expressionDisplay.Body as MemberExpression).Member.Name;
            if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
            {
                result = dbSet.Select(x => new SelectListItem()
                {
                    Value = objType.GetProperty(valueMember).GetValue(x) != null ? objType.GetProperty(valueMember).GetValue(x).ToString() : "",
                    Text = objType.GetProperty(displayMember).GetValue(x) != null ? objType.GetProperty(displayMember).GetValue(x).ToString() : "",
                    Selected = (selected != null) && selected.Equals(objType.GetProperty(valueMember).GetValue(x))
                }).ToList();
            }
            return result;
        }

        public List<SelectListItem> GetDropDownMultiple(string displayMember, string valueMember, List<object> selected = null)
        {
            Type objType = typeof(T);
            List<SelectListItem> result = new List<SelectListItem>();
            if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
            {
                result = this._dbset.ToList().Select(x => new SelectListItem()
                {
                    Value = objType.GetProperty(valueMember).GetValue(x).ToString(),
                    Text = objType.GetProperty(displayMember).GetValue(x).ToString(),
                    Selected = (selected != null) && selected.Contains(objType.GetProperty(valueMember).GetValue(x))
                }).ToList();
            }
            return result;
        }
        public List<SelectListItem> GetDropDownMultiple<TValue>(string displayMember, string valueMember, List<TValue> selected = null) where TValue : IComparable
        {
            Type objType = typeof(T);
            List<SelectListItem> result = new List<SelectListItem>();
            if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
            {
                result = this._dbset.ToList().Select(x => new SelectListItem()
                {
                    Value = objType.GetProperty(valueMember).GetValue(x).ToString(),
                    Text = objType.GetProperty(displayMember).GetValue(x).ToString(),
                    Selected = (selected != null) && selected.Any(s => s.CompareTo(Convert.ChangeType(objType.GetProperty(valueMember).GetValue(x), typeof(TValue))) == 0)
                }).ToList();
            }
            return result;
        }

        public List<object> GetListFieldValue(string fieldName)
        {
            Type objType = typeof(T);
            List<object> result = null;
            try
            {
                result = this._dbset.ToList()
                    .Select(x => objType.GetProperty(fieldName).GetValue(x)).ToList();
            }
            catch (Exception ex)
            {
                result = new List<object>();
            }
            return result;
        }

        public List<SelectListItem> GetDropdownFields(object selected = null)
        {
            Type objType = typeof(T);
            List<SelectListItem> result = new List<SelectListItem>();
            result = objType.GetProperties().Select(x => new SelectListItem()
            {
                Value = x.Name,
                Text = x.Name,
                Selected = (selected != null) && x.Name.Equals(selected)
            }).ToList();
            return result;
        }

        public List<T> GetEntitiesByFieldValue(string fieldName, object value)
        {
            Type objectType = typeof(T);
            List<T> result = this._dbset.ToList()
                .Where(x => objectType.GetProperty(fieldName)
                .GetValue(x).Equals(value)).ToList();
            return result;
        }

        public List<T> GetEntitiesByMultipleFieldValue(params KeyValuePair<string, object>[] groupKeyValue)
        {
            Type objectType = typeof(T);
            List<T> result = this._dbset.ToList();
            foreach (var pair in groupKeyValue)
            {
                result = result
                    .Where(x => objectType.GetProperty(pair.Key)
                    .GetValue(x).Equals(pair.Value)).ToList();
            }
            return result;
        }


        public T GetEmptyIfNullById(object id)
        {
            var entity = this._dbset.Find(id) ?? Activator.CreateInstance(typeof(T)) as T;
            return entity;
        }

        public void InsertRange(IEnumerable<T> entities)
        {
            _entities.Set<T>().AddRange(entities);
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            foreach (var item in entities)
            {
                if (item == null)
                {
                    throw new ArgumentNullException("entity");
                }
                this._dbset.Attach(item);
                this._entities.Entry(item).State = System.Data.Entity.EntityState.Modified;
            }
        }

        public DbContext GetContext()
        {
            return _entities;
        }

        public T FindEmptyIfNullByExp(Expression<Func<T, bool>> predicate)
        {
            var entity = _entities.Set<T>().Where(predicate).FirstOrDefault() ?? Activator.CreateInstance(typeof(T)) as T;
            return entity;
        }

        public void Delete(Expression<Func<T, bool>> filter)
        {
            var entities = _dbset.Where(filter);
            foreach (var item in entities)
            {
                if (_entities.Entry(item).State == EntityState.Detached)
                {
                    _dbset.Attach(item);
                }
                _dbset.Remove(item);
            }
        }

        public void ExecuteNonQuery(string query)
        {
            var result = this.GetContext().Database.ExecuteSqlCommand(query);
        }

        public List<T> GetEntitiesByQuery(string query)
        {
            var entities = this.GetContext().Database.SqlQuery<T>(query).ToList();
            return entities;
        }
    }
}
