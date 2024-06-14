using System.ComponentModel.DataAnnotations.Schema;

namespace Haiku.Flow.API.Data.Entities
{
    public class SampleStatistic
    {
        [ForeignKey(nameof(Sample))]
        public int Id { get; set; }
        public double AveragePlateau1 { get; set; }
        public double AveragePlateau2 { get; set; }
        public double AverageBaseline { get; set; }
        public double? AverageBaseline2 { get; set; }
        public double RelativeViscosity1 { get; set; }
        public double RelativeViscosity2 { get; set; }
        public double InherentViscosity1 { get; set; }
        public double InherentViscosity2 { get; set; }
        public double IntrinsicViscosity1 { get; set; }
        public double IntrinsicViscosity2 { get; set; }
        public double IvOutputGain { get; set; }
        public double IvOutputOffset { get; set; }
        public double AverageP2AtPlateau1 { get; set; }
        public double AverageP2AtPlateau2 { get; set; }
        public bool P2AtPlateau1ExceededMaxTransducer { get; set; }
        public bool P2AtPlateau2ExceededMaxTransducer { get; set; }
        public string SolventName { get; set; }
        public double? DensityAt25C { get; set; }
        public double? TemperatureCoefficient { get; set; }
        public double ConcentrationAtAnalysis { get; set; }
        public int SampleId { get; set; }

        public virtual Sample Sample { get; set; }

        public SampleStatistic()
        {
        }

        public Core.Models.SampleStatistic ToModel()
        {
            return new Core.Models.SampleStatistic
            {
                Id = Id,
                AveragePlateau1 = AveragePlateau1,
                AveragePlateau2 = AveragePlateau2,
                AverageBaseline1 = AverageBaseline,
                AverageBaseline2 = AverageBaseline2,
                RelativeViscosity1 = RelativeViscosity1,
                RelativeViscosity2 = RelativeViscosity2,
                InherentViscosity1 = InherentViscosity1,
                InherentViscosity2 = InherentViscosity2,
                IntrinsicViscosity1 = IntrinsicViscosity1,
                IntrinsicViscosity2 = IntrinsicViscosity2,
                AverageP2AtPlateau1 = AverageP2AtPlateau1,
                AverageP2AtPlateau2 = AverageP2AtPlateau2,
                P2AtPlateau1ExceededMaxTransducer = P2AtPlateau1ExceededMaxTransducer,
                P2AtPlateau2ExceededMaxTransducer = P2AtPlateau2ExceededMaxTransducer,
                IvOutputGain = IvOutputGain,
                IvOutputOffset = IvOutputOffset,
                SampleId = SampleId,
                TemperatureCoefficient = TemperatureCoefficient,
                DensityAt25C = DensityAt25C,
                SolventName = SolventName,
                ConcentrationAtAnalysis = ConcentrationAtAnalysis,
            };
        }
    }
}
