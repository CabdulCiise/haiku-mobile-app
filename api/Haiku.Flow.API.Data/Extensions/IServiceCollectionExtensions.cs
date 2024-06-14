using Haiku.Flow.API.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Haiku.Flow.API.Data.Extensions;

public static class IServiceCollectionExtensions
{
    public static IServiceCollection AddDataServices(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddDbContext<HaikuContext>(options =>
        {
            options.UseSqlite(configuration.GetConnectionString("HaikuContext"));
        });
    }
}
