using Haiku.Flow.API.Core.Models;
using Haiku.Flow.API.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace Haiku.Flow.API.Web.Controllers;

public class LogMessageController(ILogService logService) : BaseApiController
{
    [HttpGet]
    public List<LogMessage> GetLogs()
    {
        return logService.GetLogMessages();
    }
}
