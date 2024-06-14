using Haiku.Flow.API.Core.Models;

namespace Haiku.Flow.API.Core.Services;

public interface ISampleService : IService
{
    List<Sample> GetSamples(bool isQueued);
    SampleStatistic GetSampleStatistics(int sampleId);
    List<Injection> GetSampleInjections(int sampleId);
}
