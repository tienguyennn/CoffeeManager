using Model;
using Model.Common;
using Model.MongoEntities;
using Service.AppUserService.Dto;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Service.Common
{
    public abstract class MEntityService<T> : IMEntityService<T> where T : MAuditableEntity<ObjectId>
    {
        protected IMongoDatabase _hinetContext;
        protected readonly IQueryable<T> _dbset;
        protected readonly IMongoCollection<T> _collection;
        public MEntityService()
        {
            _hinetContext = MongoDBCommon.GetDatabase();
            _dbset = MongoDBCommon.GetCollection<T>().AsQueryable(new AggregateOptions { AllowDiskUse = true });
            _collection = MongoDBCommon.GetCollection<T>();

        }

        public virtual void Create(T entity, UserDto currentUser)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            //if (string.IsNullOrEmpty(entity.Id))
            //    entity.Id = ObjectId.GenerateNewId().ToString();
            if(entity.Id == Guid.Empty)
            {
                entity.Id = Guid.NewGuid();
            }

            entity.CreatedDate = DateTime.Now;
            if (currentUser != null)
            {
                entity.CreatedBy = currentUser.FullName;
                entity.CreatedID = currentUser.Id;
            }

            _collection.InsertOne(entity);
        }

        public virtual void CreateRange(List<T> lstentity, UserDto currentUser)
        {
            if (lstentity == null)
            {
                throw new ArgumentNullException("entity");
            }
            foreach (var entity in lstentity)
            {
                //if (entity.Id == string.Empty)
                //    entity.Id = string.GenerateNewId();

                entity.CreatedDate = DateTime.Now;
                if (currentUser != null)
                {
                    entity.CreatedBy = currentUser.FullName;
                    entity.CreatedID = currentUser.Id;

                }
            }
            _collection.InsertMany(lstentity);
        }

        public virtual void Update(T entity, UserDto currentUser)
        {

            if (entity == null) throw new ArgumentNullException("entity");
            entity.UpdatedDate = DateTime.Now;
            if (currentUser != null)
            {
                entity.UpdatedID = currentUser.Id;
                entity.UpdatedBy = currentUser.FullName;
            }

            _collection.ReplaceOne(x => x.Id == entity.Id, entity);
        }
        public virtual void Save(T entity, UserDto currentUser)
        {

            //if (!string.IsNullOrEmpty(entity.Id))
            if (entity.Id != Guid.Empty)
                Update(entity, currentUser);
            else
                Create(entity, currentUser);
        }

        public virtual void Delete(Guid Id)
        {
            _collection.DeleteOne(x => x.Id == Id);
        }
        public virtual void SoftDelete(T entity, UserDto currentUser)
        {

            if (entity == null) throw new ArgumentNullException("entity");
            entity.IsDelete = true;
            entity.DeleteTime = DateTime.Now;
            if (currentUser != null)
            {
                entity.DeleteId = currentUser.Id;
                //entity.DeleteBy = currentUser.FullName;

            }

            _collection.ReplaceOne(x => x.Id == entity.Id, entity);
        }
        public virtual void Delete(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");
            _collection.DeleteOne(x => x.Id == entity.Id);
        }

        public virtual T GetById(Guid Id)
        {
            return _collection.Find(x => x.Id == Id).FirstOrDefault();
        }

        public virtual List<T> GetByListId(List<Guid> lstId)
        {
            if (lstId == null)
                return new List<T>();
            return _collection.Find(x => lstId.Contains(x.Id)).ToList();
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            var lstId = entities.Select(x => x.Id).ToList();
            if (lstId.Any())
            {
                _collection.DeleteManyAsync(x => lstId.Contains(x.Id));
            }

        }
        public void DeleteRange(IEnumerable<Guid> listId)
        {
            if (listId.Any())
            {
                _collection.DeleteManyAsync(x => listId.Contains(x.Id));
            }

        }

        public virtual List<T> GetAll()
        {
            return _collection.Find(_ => true).ToList();
        }
        public virtual IQueryable<T> GetAllAsQueryable()
        {
            return _dbset;
        }

        public virtual IEnumerable<T> FindBy(Expression<Func<T,bool>> filtter)
        {
            return _collection.Find(filtter).ToEnumerable();
        }
        public List<SelectListItem> GetDropdown(string displayMember, string valueMember, object selected = null)
        {
            Type objType = typeof(T);
            List<SelectListItem> result = new List<SelectListItem>();
            if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
            {
                result = this._dbset.ToList().Select(x => new SelectListItem()
                {
                    Value = objType.GetProperty(valueMember).GetValue(x).ToString(),
                    Text = objType.GetProperty(displayMember).GetValue(x).ToString(),
                    Selected = (selected != null) && selected.Equals(objType.GetProperty(valueMember).GetValue(x))
                }).ToList();
            }
            return result;
        }
        //public List<SelectListItem> GetDropdown(string displayMember, string valueMember, object selected = null)
        //{
        //    Type objType = typeof(T);
        //    List<SelectListItem> result = new List<SelectListItem>();
        //    if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
        //    {
        //        result = this._dbset.ToList().Select(x => new SelectListItem()
        //        {
        //            Value = objType.GetProperty(valueMember).GetValue(x).ToString(),
        //            Text = objType.GetProperty(displayMember).GetValue(x).ToString(),
        //            Selected = (selected != null) && selected.Equals(objType.GetProperty(valueMember).GetValue(x))
        //        }).ToList();
        //    }
        //    return result;
        //}

        //public List<SelectListItem> GetDropDownMultiple(string displayMember, string valueMember, List<object> selected = null)
        //{
        //    Type objType = typeof(T);
        //    List<SelectListItem> result = new List<SelectListItem>();
        //    if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
        //    {
        //        result = this._dbset.ToList().Select(x => new SelectListItem()
        //        {
        //            Value = objType.GetProperty(valueMember).GetValue(x).ToString(),
        //            Text = objType.GetProperty(displayMember).GetValue(x).ToString(),
        //            Selected = (selected != null) && selected.Contains(objType.GetProperty(valueMember).GetValue(x))
        //        }).ToList();
        //    }
        //    return result;
        //}

        public List<object> GetListFieldValue(string fieldName)
        {
            Type objType = typeof(T);
            List<object> result = null;
            try
            {
                result = _collection.Find(_ => true).ToList()
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
            List<T> result = _collection.Find(_ => true).ToList()
                .Where(x => objectType.GetProperty(fieldName)
                .GetValue(x).Equals(value)).ToList();
            return result;
        }

        public List<T> GetEntitiesByMultipleFieldValue(params KeyValuePair<string, object>[] groupKeyValue)
        {
            Type objectType = typeof(T);
            List<T> result = _collection.Find(_ => true).ToList();
            foreach (var pair in groupKeyValue)
            {
                result = result
                    .Where(x => objectType.GetProperty(pair.Key)
                    .GetValue(x).Equals(pair.Value)).ToList();
            }
            return result;
        }
    }
}
