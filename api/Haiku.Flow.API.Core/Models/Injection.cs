using System;
using System.Collections.Generic;

namespace Haiku.Flow.API.Core.Models
{
    public class Injection : BaseModel
    {
        public DateTime DateTime { get; set; }
        public string Name { get; set; }
        public string User { get; set; }
        public int SampleId { get; set; }
        public int InjectionNumber { get; set; }
        public List<Measurement> Measurements { get; set; }
    }
}
