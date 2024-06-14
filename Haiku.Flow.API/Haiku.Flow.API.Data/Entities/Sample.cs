using System.Collections.Generic;
using System.Linq;
using System;
using Haiku.Flow.API.Core.Constants;

namespace Haiku.Flow.API.Data.Entities
{
    public class Sample : BaseEntity
    {
        public string Name { get; set; }
        public bool Archived { get; set; }
        public bool? Imported { get; set; }
        public int SequenceValue { get; set; }
        public double Concentration { get; set; }
        public double? Weight { get; set; }
        public double? Volume { get; set; }
        public double? ActualConcentration { get; set; }
        public int? SampleStatisticId { get; set; }
        public int SampleStatusId { get; set; }
        public DateTime QueuedTime { get; set; }
        public DateTime? DissolutionStartTime { get; set; }
        public DateTime? PrepCompletionTime { get; set; }
        public DateTime? TimeSampleAnalyzed { get; set; }
        public int? AutoSamplerPositionId { get; set; }
        public int? AveragingUsedForDisplay { get; set; }
        public double? PercentSolids { get; set; }
        public double? CalculatedWeight { get; set; }
        public double? AmbientTemperature { get; set; }
        public double? OvenTemperature { get; set; }
        public WashSampleType? WashSampleType { get; set; }

        public virtual AutoSamplerPosition AutoSamplerPosition { get; set; }
        public virtual SampleStatus SampleStatus { get; set; }
        public virtual SampleStatistic SampleStatistic { get; set; }
        public virtual ICollection<Injection> Injections { get; set; }

        public Sample()
        {
            Injections = new HashSet<Injection>();
        }

        public Core.Models.Sample ToModel()
        {
            return new Core.Models.Sample
            {
                Id = Id,
                Archived = Archived,
                Imported = Imported,
                Name = Name,
                SequenceValue = SequenceValue,
                Concentration = Concentration,
                CalculatedPolymerWeight = Weight,
                Volume = Volume,
                ActualConcentration = ActualConcentration,
                SampleStatisticId = SampleStatisticId,
                SampleStatusId = SampleStatusId,
                DissolutionStartTime = DissolutionStartTime,
                PrepCompletionTime = PrepCompletionTime,
                TimeSampleAnalyzed = TimeSampleAnalyzed,
                AutoSamplerPositionId = AutoSamplerPositionId,
                AveragingUsedForDisplay = AveragingUsedForDisplay,
                QueuedTime = QueuedTime,
                PercentSolids = PercentSolids,
                TotalSampleWeight = CalculatedWeight,
                AmbientTemperature = AmbientTemperature,
                OvenTemperature = OvenTemperature,
                WashSampleType = WashSampleType,
                AutoSamplerPosition = AutoSamplerPosition?.ToModel(),
                SampleStatus = SampleStatus?.ToModel(),
                SampleStatistic = SampleStatistic?.ToModel(),
                Injections = Injections.Select(x => x.ToModel()).ToList()
            };
        }
    }
}