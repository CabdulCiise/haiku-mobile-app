using Haiku.Flow.API.Core.DTOs;
using Haiku.Flow.API.Core.Models;

namespace Haiku.Flow.API.Core.Services;

public interface IUserService : IService
{
    User Authenticate(UserDto user);
}
