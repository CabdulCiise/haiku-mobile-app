namespace Haiku.Flow.API.Web.Extensions;

public static class WebApplicationExtensions
{
    public static WebApplicationBuilder ConfigureKestrel(this WebApplicationBuilder builder)
    {
        if (builder.Environment.IsDevelopment())
        {
            builder.WebHost.ConfigureKestrel(options =>
            {
                options.ListenAnyIP(5000);
            });
        }

        return builder;
    }

    public static WebApplication Configure(this WebApplication app)
    {
        app.UseCors(policy =>
        {
            policy
                .WithOrigins("*", "http://localhost:8081")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });

        app.UseSwagger();
        app.UseSwaggerUI();
        app.MapControllers();

        return app;
    }
}
