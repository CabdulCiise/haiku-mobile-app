using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Haiku.Flow.API.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Infrastructure;

namespace Haiku.Flow.API.Data.Contexts;

public class HaikuContext : DbContext
{
    private readonly IConfiguration Configuration;

    public HaikuContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(Configuration.GetConnectionString("HaikuContext"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (IMutableEntityType entity in modelBuilder.Model.GetEntityTypes())
        {
            entity.SetTableName(entity.DisplayName());
        }

        base.OnModelCreating(modelBuilder);
    }

    public DbSet<AutoSamplerPosition> AutoSamplerPositions { get; set; }
    public DbSet<LogMessage> LogMessages { get; set; }
    public DbSet<UserSettingGroup> UserSettingGroups { get; set; }
    public DbSet<UserSetting> UserSettings { get; set; }
    public DbSet<UserSettingOptionValue> UserSettingOptionValues { get; set; }
    public DbSet<Sample> Samples { get; set; }
    public DbSet<SampleStatistic> SampleStatistics { get; set; }
    public DbSet<SampleStatus> SampleStatus { get; set; }
    public DbSet<Measurement> Measurements { get; set; }
    public DbSet<Injection> Injections { get; set; }
    public DbSet<EmbeddedCommand> EmbeddedCommands { get; set; }
    public DbSet<EmbeddedCommandParameter> EmbeddedCommandParameters { get; set; }
    public DbSet<EmbeddedCommandParameterOptionValue> EmbeddedCommandParameterOptionValues { get; set; }
    public DbSet<EmbeddedCommandStep> EmbeddedCommandSteps { get; set; }
    public DbSet<EmbeddedCommandStepParameterValue> EmbeddedCommandStepParameterValues { get; set; }
    public DbSet<EmbeddedCommandMethod> EmbeddedCommandMethods { get; set; }
    public DbSet<SystemTest> SystemTests { get; set; }
    public DbSet<LinearityStatistic> LinearityStatistics { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Solvent> Solvents { get; set; }
}
