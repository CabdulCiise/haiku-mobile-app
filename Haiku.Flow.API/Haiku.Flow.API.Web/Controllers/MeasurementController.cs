using Haiku.Flow.API.Core.Models;
using Haiku.Flow.API.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace Haiku.Flow.API.Web.Controllers;

public class MeasurementController(IMeasurementService measurementService) : BaseApiController
{
    [HttpGet("{injectionId}")]
    public List<Measurement> GetMeasurements(int injectionId)
    {
        return measurementService.GetMeasurements(injectionId);
    }
}
