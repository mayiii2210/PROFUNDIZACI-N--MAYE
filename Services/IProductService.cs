using ProductsApp.Models;

namespace ProductsApp.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Products>> GetAllProductsAsync();
        Task<Products?> GetProductByIdAsync(int id);
        Task AddProductAsync(Products product);
        Task UpdateProductAsync(Products product);
        Task DeleteProductAsync(int id);
        Task<ProductDetail?> GetProductDetailByProductIdAsync(int productId);
        Task AddProductDetailAsync(ProductDetail productDetail);
    }
}
