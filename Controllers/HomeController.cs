using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AppProductos.Models;
using AppProductos.Services;

namespace AppProductos.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IProductoService _productoService;

    public HomeController(ILogger<HomeController> logger, IProductoService productoService)
    {
        _logger = logger;
        _productoService = productoService;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult Products()
    {
        var productos = _productoService.ObtenerTodos();
        return View(productos);
    }

    public IActionResult BuscarProducto(string query)
{
    if (string.IsNullOrEmpty(query))
    {
        return RedirectToAction("Products");
    }

    var productos = _productoService.ObtenerTodos()
        .Where(p => p.Nombre.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                    p.Categoria.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                    p.Descripcion.Contains(query, StringComparison.OrdinalIgnoreCase))
        .ToList();

    return View("Products", productos);
}


    public IActionResult AgregarProducto()
    {
        return View();
    }

    [HttpPost]
    public IActionResult AgregarProducto(Producto producto)
    {
        if (ModelState.IsValid)
        {
            _productoService.Agregar(producto);
            return RedirectToAction("Products");
        }
        return View(producto);
    }

    public IActionResult EditarProducto(int id)
    {
        var producto = _productoService.ObtenerPorId(id);
        if (producto == null)
        {
            return NotFound("Producto no encontrado");
        }
        return View(producto);  
    }

    [HttpPost]
    public IActionResult EditarProducto(Producto producto)
    {
        if (ModelState.IsValid)
        {
            _productoService.Actualizar(producto);
            return RedirectToAction("Products");
        }
        return View(producto);
    }
  

    public IActionResult EliminarProducto(int id)
    {
        var producto = _productoService.ObtenerPorId(id);
        if (producto == null)
        {
            return NotFound("Producto no encontrado");
        }

        return View(producto); 
    }



    [HttpPost]
    public IActionResult ConfirmarEliminar(int id)
    {
        var producto = _productoService.ObtenerPorId(id);
        if (producto != null)
        {
            _productoService.Eliminar(id); // Elimina el producto
            return RedirectToAction("Products"); // Redirige de nuevo a la lista de productos
        }
        return NotFound("Producto no encontrado");
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
