using Haiku.Flow.API.Core.Models;

namespace Haiku.Flow.API.Core.Services;

public interface IMeasurementService : IService
{
    List<Measurement> GetMeasurements(int injectionId);
}
