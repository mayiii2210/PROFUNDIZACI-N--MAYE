using ProductsApp.Dtos;
using ProductsApp.Models;

namespace ProductsApp.Services
{
    public interface IProductService
    {
        Task<(IEnumerable<Product> items, int totalItems, int totalPages)> GetAllProductsAsync(int page, int size);
        Task<Product?> GetByIdAsync(int id);
        Task AddProductAsync(ProductDto productDto);
        Task UpdateProductAsync(int id, ProductDto productDto);
        Task DeleteProductAsync(int id);
        Task<IEnumerable<Product>> SearchProductsAsync(int? id, string? name, string? categoryName);
    }
}


