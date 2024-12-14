using CraftersCornerAPI.Models;
using Microsoft.Extensions.Options;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("StripeSettings"));

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowSpecificOrigin", policy =>
      policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);

var app = builder.Build();

app.Use(async (context, next) =>
{
  if (context.Request.Method == "OPTIONS")
  {
    context.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:4200");
    context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
    context.Response.StatusCode = 200;
    await context.Response.CompleteAsync();
    return;
  }
  await next();
});

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

var stripeSettings = app.Services.GetRequiredService<IOptions<StripeSettings>>().Value;
StripeConfiguration.ApiKey = stripeSettings.SecretKey;

app.Run();
