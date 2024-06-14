namespace Haiku.Flow.API.Data.Entities
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }

        public Core.Models.User ToModel()
        {
            return new Core.Models.User
            {
                Id = Id,
                UserName = UserName,
                Password = Password,
                Role = Role,
                IsActive = IsActive
            };
        }
    }
}
