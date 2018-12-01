using System;
using System.Collections.Generic;
using System.Linq;
using ReactCoreBoilerplate.Infrastructure;
using ReactCoreBoilerplate.Models;

namespace ReactCoreBoilerplate.Services
{
    public class PersonService : ServiceBase
    {
        protected static List<PersonModel> PeopleList { get; }

        static PersonService()
        {
            PeopleList = new List<PersonModel>
            {
                new PersonModel(1, "Bill", "Gates"),
                new PersonModel(2, "Jeffrey", "Richter"),
                new PersonModel(3, "Dennis", "Ritchie"),
                new PersonModel(4, "Ken", "Thompson"),
                new PersonModel(5, "Steve", "Jobs"),
                new PersonModel(6, "Steve", "Ballmer"),
                new PersonModel(7, "Alan", "Turing")
            };
        }

        public virtual Result<List<PersonModel>> Search(string term = null)
        {
            if (!string.IsNullOrEmpty(term))
            {
                term = term.ToLower();

                var result = 
                    PeopleList
                    .Where(x =>
                        x.FirstName.ToLower().Contains(term) ||
                        x.LastName.ToLower().Contains(term)
                    )
                    .ToList();

                return Ok(result);
            }

            return Ok(PeopleList);
        }

        public virtual Result<int> Add(PersonModel model)
        {
            if (model == null)
                return Error<int>();
            if (string.IsNullOrEmpty(model.FirstName))
                return Error<int>("First name not defined.");
            if (string.IsNullOrEmpty(model.LastName))
                return Error<int>("Last name not defined.");

            var newId = PeopleList.Max(x => x?.Id ?? 0) + 1;
            model.Id = newId;

            PeopleList.Add(model);

            return Ok(model.Id);
        }

        public virtual Result Update(PersonModel model)
        {
            if (model == null)
                return Error();
            if (model.Id <= 0)
                return Error($"{model.Id} <= 0.");
            var person = PeopleList.Where(x => x.Id == model.Id).FirstOrDefault();
            if (person == null)
                return Error($"Person with id = {model.Id} not found.");

            person.FirstName = model.FirstName;
            person.LastName = model.LastName;

            return Ok();
        }

        public virtual Result Delete(int id)
        {
            var unit = PeopleList.Where(x => x.Id == id).FirstOrDefault();
            if (unit == null)
                return Error($"Can't find person with Id = {id}.");
            PeopleList.Remove(unit);
            return Ok();
        }
    }
}
