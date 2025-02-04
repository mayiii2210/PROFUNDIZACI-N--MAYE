using ProductsApp.Models;

namespace ProductsApp.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Products>> GetAllAsync();
        Task<Products?> GetByIdAsync(int id);

  
        Task AddAsync(Products products);

        Task UpdateAsync(Products product);

        Task DeleteAsync(int id);

        Task<ProductDetail?> GetProductDetailAsync(int productId);
    }
}
