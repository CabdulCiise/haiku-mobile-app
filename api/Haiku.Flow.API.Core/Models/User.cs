using Haiku.Flow.API.Core.Constants;

namespace Haiku.Flow.API.Core.Models
{
    public class User : BaseModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }

        public bool IsSuperuser => Role == Roles.SuperUser && IsActive;
        public bool IsAdmin => Role == Roles.Admin && IsActive;
        public bool IsUser => Role == Roles.User && IsActive;
        public bool IsAdvancedUser => (IsAdmin || IsSuperuser) && IsActive;

        public User()
        {
        }

        public User(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }
    }
}
