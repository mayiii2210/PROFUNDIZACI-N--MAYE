using AppProductos.Models;
using AppProductos.Data;

namespace AppProductos.Repositories;

public interface IProductoRepository {
    IEnumerable<Producto> ObtenerTodos();
    Producto ObtenerPorId(int id);
    void Agregar(Producto product);
    void Actualizar(Producto product);
    void Eliminar(int id);
}

public class ProductoRepository : IProductoRepository {
    
    private readonly AppDbContext _context;

    public ProductoRepository(AppDbContext context) {
        _context = context;
    }

    public IEnumerable<Producto> ObtenerTodos() {
        return _context.Productos.ToList();
    }

    public Producto ObtenerPorId(int id) {
    return _context.Productos.FirstOrDefault(p => p.Id == id) 
        ?? throw new InvalidOperationException($"No se encontró un producto con ID {id}");
    }



    public void Agregar(Producto producto) {
        _context.Productos.Add(producto);
        _context.SaveChanges();
    }

    public void Actualizar(Producto product) {
        var productoExistente = ObtenerPorId(product.Id);
        if (productoExistente != null)
        {
            productoExistente.Nombre = product.Nombre;
            productoExistente.Precio = product.Precio;
            productoExistente.Categoria = product.Categoria;
            productoExistente.Descripcion = product.Descripcion;

            _context.Productos.Update(productoExistente);
            _context.SaveChanges();
        }
    }

    public void Eliminar(int id) {
        var product = ObtenerPorId(id);
        if (product != null)
        {
            _context.Productos.Remove(product);
            _context.SaveChanges();
        }
    }
}
