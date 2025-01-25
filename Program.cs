var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

var weatherforecast = new List<WeatherForecast>();


app.MapGet("/weatherforecast/{index}", (int index)=> {

    if(index < 0 || index >= weatherforecast.Count) {

        return Results.NotFound(new {message = "El índice no fue encontrado"});
    }
   return Results.Ok(weatherforecast[index]);
});

app.MapPut("/weatherforecast/{index}", (int index, WeatherForecast updatedWeather) =>
    index < 0 || index >= weatherforecast.Count
        ? Results.NotFound(new { message = "El índice no fue encontrado" })
        : Results.Ok(new { 
            message = "Elemento actualizado correctamente", 
            updatedWeather = weatherforecast[index] = updatedWeather 
        })
);

app.MapPost("/weatherforecast", (WeatherForecast weather)=> {
    weatherforecast.Add(weather);
    return Results.Created($"/weatherforecast/{weatherforecast.Count -1}", weather);
    
});

app.MapDelete("/weatherforecast/{index}", (int index)=>{
    if (index < 0 || index >= weatherforecast.Count)
    {
        return Results.NotFound(new { message = "El índice está fuera de rango" });
    }

    var deleteWeather = weatherforecast[index];
    weatherforecast.RemoveAt(index);

     return Results.Ok(new{message = "Elemento eliminado correctamente", deleteWeather});
});

app.MapGet("/weatherforecast", () =>
{
   
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
