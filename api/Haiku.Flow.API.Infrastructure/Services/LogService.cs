using Haiku.Flow.API.Core.Models;
using Haiku.Flow.API.Core.Services;
using Haiku.Flow.API.Data.Contexts;

namespace Haiku.Flow.API.Infrastructure.Services;

public class LogService(HaikuContext haikuContext) : ILogService
{
    public List<LogMessage> GetLogMessages()
    {
        return haikuContext.LogMessages
            .OrderByDescending(x => x.DateTime)
            .Take(1000)
            .Select(x => x.ToModel())
            .ToList();
    }
}
