using ProductsApp.Models;

namespace ProductsApp.Repositories
{
    public interface IProductRepository
    {
        Task<(IEnumerable<Product> items, int totalItems, int totalPages)> GetAllAsync(int page, int size);
        Task<Product?> GetByIdAsync(int id);
        Task AddAsync(Product product);
        Task UpdateAsync(int id, Product product);
        Task DeleteAsync(int id);

        Task<IEnumerable<Product>> SearchAsync(int? id, string? name, string? categoryName);
    }
}