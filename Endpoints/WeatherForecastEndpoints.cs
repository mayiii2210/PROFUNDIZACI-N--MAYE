using MyApp.Models;

namespace MyApp.Endpoints
{
    public static class WeatherForecastEndpoints
    {
        private static readonly List<WeatherForecast> weatherForecasts = new();

        public static void MapWeatherForecastEndpoints(this WebApplication app)
        {
            // Endpoint GET
            app.MapGet("/weatherforecast/{index}", (int index) =>
            {
                if (index < 0 || index >= weatherForecasts.Count)
                {
                    return Results.NotFound(new { message = "El índice no fue encontrado" });
                }
                return Results.Ok(weatherForecasts[index]);
            });

            // Endpoint PUT
            app.MapPut("/weatherforecast/{index}", (int index, WeatherForecast updatedWeather) =>
                index < 0 || index >= weatherForecasts.Count
                    ? Results.NotFound(new { message = "El índice no fue encontrado" })
                    : Results.Ok(new
                    {
                        message = "Elemento actualizado correctamente",
                        updatedWeather = weatherForecasts[index] = updatedWeather
                    })
            );

            // Endpoint POST
            app.MapPost("/weatherforecast", (WeatherForecast weather) =>
            {
                weatherForecasts.Add(weather);
                return Results.Created($"/weatherforecast/{weatherForecasts.Count - 1}", weather);
            });

            // Endpoint DELETE
            app.MapDelete("/weatherforecast/{index}", (int index) =>
            {
                if (index < 0 || index >= weatherForecasts.Count)
                {
                    return Results.NotFound(new { message = "El índice no fue encontrado" });
                }

                var deletedWeather = weatherForecasts[index];
                weatherForecasts.RemoveAt(index);

                return Results.Ok(new { message = "Elemento eliminado correctamente", deletedWeather });
            });

            // Endpoint GET para obtener todos los elementos
            app.MapGet("/weatherforecast", () =>
            {
                return Results.Ok(weatherForecasts);
            })
            .WithName("GetWeatherForecast");
        }
    }
}
