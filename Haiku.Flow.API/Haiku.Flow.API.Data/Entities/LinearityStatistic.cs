using System;

namespace Haiku.Flow.API.Data.Entities
{
    public class LinearityStatistic : BaseEntity
    {
        public DateTime Date { get; set; }
        public bool HasPassed { get; set; }
        public double P1Offset { get; set; }
        public double P1Gain { get; set; }
        public double P2Offset { get; set; }
        public double P2Gain { get; set; }
        public double PassCriteriaPercentageAdditionalWindowsAreWithinBaselineWindow { get; set; }
        public double PassCriteriaPercentDiffRatioMinMax { get; set; }
        public int Speed1Id { get; set; }
        public int Speed2Id { get; set; }
        public int Speed3Id { get; set; }
        public int Speed4Id { get; set; }
        public int Speed5Id { get; set; }

        public virtual LinearitySet Speed1 { get; set; }
        public virtual LinearitySet Speed2 { get; set; }
        public virtual LinearitySet Speed3 { get; set; }
        public virtual LinearitySet Speed4 { get; set; }
        public virtual LinearitySet Speed5 { get; set; }

        public Core.Models.LinearityStatistic ToModel()
        {
            return new Core.Models.LinearityStatistic
            {
                Id = Id,
                Date = Date,
                HasPassed = HasPassed,
                P1Gain = P1Gain,
                P1Offset = P1Offset,
                P2Gain = P2Gain,
                P2Offset = P2Offset,
                PassCriteriaPercentageAdditionalWindowsAreWithinBaselineWindow = PassCriteriaPercentageAdditionalWindowsAreWithinBaselineWindow,
                PassCriteriaPercentDiffRatioMinMax = PassCriteriaPercentDiffRatioMinMax,
                Speed1 = Speed1.ToModel(),
                Speed2 = Speed2.ToModel(),
                Speed3 = Speed3.ToModel(),
                Speed4 = Speed4.ToModel(),
                Speed5 = Speed5.ToModel(),
            };
        }
    }
}
