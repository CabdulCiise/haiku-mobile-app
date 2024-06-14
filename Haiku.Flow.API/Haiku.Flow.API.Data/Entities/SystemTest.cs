using System;

namespace Haiku.Flow.API.Data.Entities
{
    public class SystemTest : BaseEntity
    {
        public string Name { get; set; }
        public bool HasPassed { get; set; }
        public DateTime LastRan { get; set; }
        public int Count { get; set; }

        public SystemTest()
        {
        }

        public Core.Models.SystemTest ToModel()
        {
            return new Core.Models.SystemTest
            {
                Id = Id,
                HasPassed = HasPassed,
                Name = Name,
                LastRan = LastRan,
                Count = Count
            };
        }
    }
}
