using CustomerWebApi.Data;
using CustomerWebApi.Repositories;
using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;

// Get Logger
var logger = NLogBuilder.ConfigureNLog("NLog.config").GetCurrentClassLogger();

try
{
    logger.Debug("Initializing App...");

    var builder = WebApplication.CreateBuilder(args);

    // Add Db Connection
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    // Add services to the container.
    builder.Services.AddControllers();
    builder.Services.AddScoped(typeof(ICustomerRepository), typeof(CustomerRepository));


    // Add NLog Logger
    builder.Logging.ClearProviders();
    builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
    builder.Host.UseNLog();

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch(Exception ex)
{
    logger.Error(ex, "Stopped program because of exception");
    throw;
}
finally
{
    LogManager.Shutdown();
}

