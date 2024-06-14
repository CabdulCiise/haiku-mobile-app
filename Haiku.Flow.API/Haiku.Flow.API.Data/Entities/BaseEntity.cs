using System.ComponentModel.DataAnnotations;

namespace Haiku.Flow.API.Data.Entities
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
