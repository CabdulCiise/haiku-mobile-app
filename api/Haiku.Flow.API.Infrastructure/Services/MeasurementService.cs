using Haiku.Flow.API.Core.Models;
using Haiku.Flow.API.Core.Services;
using Haiku.Flow.API.Data.Contexts;

namespace Haiku.Flow.API.Infrastructure.Services;

public class MeasurementService(HaikuContext haikuContext) : IMeasurementService
{
    public List<Measurement> GetMeasurements(int injectionId)
    {
        return haikuContext.Measurements
            .Where(x => x.InjectionId == injectionId)
            .OrderBy(x => x.Order)
            .Select(x => x.ToModel())
            .ToList();
    }
}
