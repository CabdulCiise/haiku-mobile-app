using System;

namespace Haiku.Flow.API.Core.Models
{
    public class SystemTest : BaseModel
    {
        public string Name { get; set; }
        public bool? HasPassed { get; set; }
        public DateTime? LastRan { get; set; }
        public int Count { get; set; }
    }
}
