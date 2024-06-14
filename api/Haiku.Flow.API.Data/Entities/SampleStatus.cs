using System.Collections.Generic;
using System.Linq;

namespace Haiku.Flow.API.Data.Entities
{
    public class SampleStatus : BaseEntity
    {
        public string Name { get; set; }


        public SampleStatus()
        {
        }

        public Core.Models.SampleStatus ToModel()
        {
            return new Core.Models.SampleStatus
            {
                Id = Id,
                Name = Name
            };
        }
    }
}
