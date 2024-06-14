using System;

namespace Haiku.Flow.API.Core.Models
{
    public class LinearitySet : BaseModel
    {
        public DateTime Date { get; set; }
        public bool HasPassed { get; set; }
        public double P1Mean { get; set; }
        public double P2Mean { get; set; }
        public double RatioMean { get; set; }
        public double PercentDiffMinMeanToBaseline { get; set; }
        public double PercentDiffMaxMeanToBaseline { get; set; }
        public double PercentDiffRatioMinMax { get; set; }
        public int LinearityStatisticId { get; set; }
    }
}
