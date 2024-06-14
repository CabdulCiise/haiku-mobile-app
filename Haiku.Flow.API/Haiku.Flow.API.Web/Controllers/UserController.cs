using Haiku.Flow.API.Core.Models;
using Haiku.Flow.API.Core.DTOs;
using Haiku.Flow.API.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace Haiku.Flow.API.Web.Controllers;

public class UserController(IUserService userService) : BaseApiController
{
    [HttpPost("authenticate")]
    public User Authenticate(UserDto user)
    {
        return userService.Authenticate(user);
    }
}
