using Haiku.Flow.API.Core.Models;
using Haiku.Flow.API.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace Haiku.Flow.API.Web.Controllers;

public class SampleController(ISampleService sampleService) : BaseApiController
{
    [HttpGet]
    public List<Sample> GetSamples(bool isQueued = true)
    {
        return sampleService.GetSamples(isQueued);
    }

    [HttpGet("statistics/{sampleId}")]
    public SampleStatistic GetSampleStatistics(int sampleId)
    {
        var test = sampleService.GetSampleStatistics(sampleId);
        return test;
    }

    [HttpGet("injections/{sampleId}")]
    public List<Injection> GetSampleInjections(int sampleId)
    {
        return sampleService.GetSampleInjections(sampleId);
    }
}
