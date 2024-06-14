using System;

namespace Haiku.Flow.API.Core.Models
{
    public class SampleStatistic : BaseModel
    {
        public double AverageP2AtPlateau1 { get; set; }
        public double AverageP2AtPlateau2 { get; set; }
        public bool P2AtPlateau1ExceededMaxTransducer { get; set; }
        public bool P2AtPlateau2ExceededMaxTransducer { get; set; }
        public bool P2AtPlateauExceededMaxTransducer => P2AtPlateau1ExceededMaxTransducer || P2AtPlateau2ExceededMaxTransducer;
        public double ConcentrationAtAnalysis { get; set; }
        public double AveragePlateau1 { get; set; }
        public double AveragePlateau2 { get; set; }
        public double AverageBaseline1 { get; set; }
        public double? AverageBaseline2 { get; set; }
        public double RelativeViscosity1 { get; set; }
        public double RelativeViscosity2 { get; set; }
        public double InherentViscosity1 { get; set; }
        public double InherentViscosity2 { get; set; }
        public double IntrinsicViscosity1 { get; set; }
        public double IntrinsicViscosity2 { get; set; }
        public string SolventName { get; set; }
        public double? DensityAt25C { get; set; }
        public double? TemperatureCoefficient { get; set; }
        public double IvOutputGain { get; set; }
        public double IvOutputOffset { get; set; }
        public double AverageIntrinsicViscosity => (IntrinsicViscosity1 + IntrinsicViscosity2) / 2;
        public double AverageInherentViscosity => (InherentViscosity1 + InherentViscosity2) / 2;
        public double PercentRsdIntrinsicViscosity => CalculatePercentRsdIv(IntrinsicViscosity1, IntrinsicViscosity2);
        public double PercentRsdInherentViscosity => CalculatePercentRsdIv(InherentViscosity1, InherentViscosity2);
        public int SampleId { get; set; }
        public Sample Sample { get; set; }

        private double CalculatePercentRsdIv(double iv1, double iv2)
        {
            double avg = (iv1 + iv2) / 2;

            double sum = Math.Pow(iv1 - avg, 2) + Math.Pow(iv1 - avg, 2);

            return Math.Sqrt(sum/2) / avg * 100;
        }
    }
}
