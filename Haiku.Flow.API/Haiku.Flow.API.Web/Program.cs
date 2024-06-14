using Haiku.Flow.API.Infrastructure.Extensions;
using Haiku.Flow.API.Data.Extensions;
using Haiku.Flow.API.Web.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddDataServices(builder.Configuration)
    .AddInfrastructureServices()
    .AddWebServices(builder.Configuration);

builder
    .ConfigureKestrel()
    .Build()
    .Configure()
    .Run();