using Haiku.Flow.API.Core.Models;
using Haiku.Flow.API.Core.Services;
using Haiku.Flow.API.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Haiku.Flow.API.Infrastructure.Services;

public class SampleService(HaikuContext haikuContext) : ISampleService
{
    public List<Sample> GetSamples(bool isQueued)
    {
        return haikuContext.Samples
            .Include(x => x.SampleStatus)
            .Where(x => x.Archived != isQueued)
            .OrderBy(x => x.TimeSampleAnalyzed)
            .ThenBy(x => x.DissolutionStartTime)
            .ThenBy(x => x.PrepCompletionTime)
            .ThenBy(x => x.QueuedTime)
            .Select(x => x.ToModel())
            .ToList();
    }

    public List<Injection> GetSampleInjections(int sampleId)
    {
        return haikuContext.Samples
            .Include(x => x.Injections)
                .ThenInclude(x => x.Measurements)
            .Where(x => x.Id == sampleId)
            .SelectMany(x => x.Injections)
            .OrderBy(x => x.InjectionNumber)
            .Select(x => x.ToModel())
            .ToList();
    }

    public SampleStatistic GetSampleStatistics(int sampleId)
    {
        return haikuContext.Samples
            .Include(x => x.SampleStatistic)
            .Where(x => x.Id == sampleId && x.SampleStatistic != null)
            .Select(x => x.SampleStatistic.ToModel())
            .FirstOrDefault();
    }
}
