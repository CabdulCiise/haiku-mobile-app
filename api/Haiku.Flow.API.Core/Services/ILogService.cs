using Haiku.Flow.API.Core.Models;

namespace Haiku.Flow.API.Core.Services;

public interface ILogService
{
    List<LogMessage> GetLogMessages();
}
