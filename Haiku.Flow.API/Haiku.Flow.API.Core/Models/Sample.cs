using System.Collections.Generic;
using System;
using Haiku.Flow.API.Core.Constants;

namespace Haiku.Flow.API.Core.Models
{
    public class Sample : BaseModel
    {
        public string Name { get; set; }
        public bool Archived { get; set; }
        public bool? Imported { get; set; }
        public int SequenceValue { get; set; }
        public double Concentration { get; set; }
        public double? CalculatedPolymerWeight { get; set; }
        public double? Volume { get; set; }
        public double? ActualConcentration { get; set; }
        public int? SampleStatisticId { get; set; }
        public int SampleStatusId { get; set; }
        public int? AutoSamplerPositionId { get; set; }
        public DateTime QueuedTime { get; set; }
        public DateTime? DissolutionStartTime { get; set; }
        public DateTime? PrepCompletionTime { get; set; }
        public DateTime? TimeSampleAnalyzed { get; set; }
        public int? AveragingUsedForDisplay { get; set; }
        public double? PercentSolids { get; set; }
        public double? TotalSampleWeight { get; set; }
        public double? AmbientTemperature { get; set; }
        public double? OvenTemperature { get; set; }
        public AutoSamplerPosition AutoSamplerPosition { get; set; }
        public SampleStatus SampleStatus { get; set; }
        public SampleStatistic SampleStatistic { get; set; }
        public List<Injection> Injections { get; set; }
        public WashSampleType? WashSampleType { get; set; }

        public bool IsSampleReady => SampleStatus?.Name.Equals(SampleStatuses.Ready) ?? false;
        public bool IsSamplePreWeigh => SampleStatus?.Name.Equals(SampleStatuses.PreWeigh) ?? false;
        public bool IsSampleQueued => SampleStatus?.Name.Equals(SampleStatuses.Queued) ?? false;
        public bool IsSamplePreparing => SampleStatus?.Name.Equals(SampleStatuses.Preparing) ?? false;
        public bool IsSampleDissolving => SampleStatus?.Name.Equals(SampleStatuses.Dissolving) ?? false;
        public bool IsSampleCompleted => SampleStatus?.Name.Equals(SampleStatuses.Completed) ?? false;
        public bool IsAWashSample => WashSampleType != null;
    }
}
