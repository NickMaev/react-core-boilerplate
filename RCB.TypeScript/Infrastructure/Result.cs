using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace RCB.TypeScript.Infrastructure
{
    public class Result
    {
        public List<string> Errors { get; set; } = new List<string>();

        [JsonIgnore]
        public bool HasErrors => Errors != null && Errors.Any();

        public Result()
        {

        }

        public Result(params string[] errors)
        {
            this.Errors = errors.ToList();
        }

        public void AddError(string error)
        {
            this.Errors.Add(error);
        }

        public void AddErrors(string[] errors)
        {
            this.Errors.AddRange(errors);
        }
    }

    public class Result<T> : Result
    {
        public T Value { get; set; }

        public Result(T value)
        {
            this.Value = value;
        }

        public Result(params string[] errors) : base(errors)
        {
        }
    }
}
