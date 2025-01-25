using MyApp.Endpoints; // Aquí importamos el espacio de nombres para los endpoints
using MyApp.Models; // Si lo necesitas para los modelos

var builder = WebApplication.CreateBuilder(args);

// Agregar OpenAPI directamente aquí
builder.Services.AddOpenApi();

var app = builder.Build();

// Configurar el pipeline de solicitudes
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Mapear los endpoints desde otro archivo
app.MapWeatherForecastEndpoints(); // Aquí se mapea el método de los endpoints

app.Run();
