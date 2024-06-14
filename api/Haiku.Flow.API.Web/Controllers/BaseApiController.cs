using Microsoft.AspNetCore.Mvc;

namespace Haiku.Flow.API.Web.Controllers;

[ApiController]
[Route("[controller]")]
public abstract class BaseApiController : ControllerBase
{
}

