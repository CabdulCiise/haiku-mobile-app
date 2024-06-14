using Haiku.Flow.API.Core.DTOs;
using Haiku.Flow.API.Core.Models;
using Haiku.Flow.API.Core.Services;
using Haiku.Flow.API.Data.Contexts;

namespace Haiku.Flow.API.Infrastructure.Services;

public class UserService(HaikuContext haikuContet) : IUserService
{
    public User Authenticate(UserDto user)
    {
        var entity = haikuContet.Users.FirstOrDefault(x => x.UserName == user.UserName);
        if (entity != null &&
            user.UserName == entity.UserName &&
            user.Password == entity.Password &&
            entity.IsActive)
        {
            return entity.ToModel();
        }

        return null;
    }
}
