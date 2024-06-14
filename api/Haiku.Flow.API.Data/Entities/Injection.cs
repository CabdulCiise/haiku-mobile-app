using System;
using System.Collections.Generic;
using System.Linq;

namespace Haiku.Flow.API.Data.Entities
{
    public class Injection : BaseEntity
    {
        public DateTime DateTime { get; set; }
        public string Name { get; set; }
        public string User { get; set; }
        public int SampleId { get; set; }
        public int InjectionNumber { get; set; }

        public virtual Sample Sample { get; set; }
        public virtual ICollection<Measurement> Measurements { get; set; }

        public Injection()
        {
            Measurements = new HashSet<Measurement>();
        }

        public Core.Models.Injection ToModel()
        {
            return new Core.Models.Injection
            {
                Id = Id,
                DateTime = DateTime,
                Name = Name,
                User = User,
                SampleId = SampleId,
                InjectionNumber = InjectionNumber,
                Measurements = Measurements.OrderBy(x => x.Order).Select(x => x.ToModel()).ToList()
            };
        }
    }
}
