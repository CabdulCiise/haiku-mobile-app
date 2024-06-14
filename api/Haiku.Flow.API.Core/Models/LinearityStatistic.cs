using System;
using System.Collections.Generic;

namespace Haiku.Flow.API.Core.Models
{
    public class LinearityStatistic : BaseModel
    {
        public DateTime Date { get; set; }
        public bool HasPassed { get; set; }
        public double P1Offset { get; set; }
        public double P1Gain { get; set; }
        public double P2Offset { get; set; }
        public double P2Gain { get; set; }
        public double PassCriteriaPercentageAdditionalWindowsAreWithinBaselineWindow { get; set; }
        public double PassCriteriaPercentDiffRatioMinMax { get; set; }
        public LinearitySet Speed1 { get; set; }
        public LinearitySet Speed2 { get; set; }
        public LinearitySet Speed3 { get; set; }
        public LinearitySet Speed4 { get; set; }
        public LinearitySet Speed5 { get; set; }

        public List<double> LinearityRatioMeans => new List<double>
        {
            Speed1.RatioMean,
            Speed2.RatioMean,
            Speed3.RatioMean,
            Speed4.RatioMean,
            Speed5.RatioMean
        };

        public List<LinearitySet> GetLinearitySets()
        {
            return new List<LinearitySet>
            {
                Speed1,
                Speed2,
                Speed3,
                Speed4,
                Speed5
            };
        }

        public void SetLinearitySet(LinearitySet set, int linearitySpeed)
        {
            switch (linearitySpeed)
            {
                case 0:
                    Speed1 = set;
                    break;

                case 1:
                    Speed2 = set;
                    break;

                case 2:
                    Speed3 = set;
                    break;

                case 3:
                    Speed4 = set;
                    break;

                case 4:
                    Speed5 = set;
                    break;

                default:
                    break;
            }
        }
    }
}
