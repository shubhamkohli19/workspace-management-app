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
      policy.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);




var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
app.Use(async (context, next) =>
{
  if (context.Request.Method == HttpMethods.Options)
  {
    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
    context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
    context.Response.StatusCode = 200;
    return;
  }

  await next.Invoke();
});
app.UseCors("AllowSpecificOrigin");
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

var stripeSettings = app.Services.GetRequiredService<IOptions<StripeSettings>>().Value;
StripeConfiguration.ApiKey = stripeSettings.SecretKey;

app.Run();
