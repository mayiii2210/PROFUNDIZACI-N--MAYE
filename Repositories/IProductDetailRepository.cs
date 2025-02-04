using ProductsApp.Models;

namespace ProductsApp.Repositories
{
    public interface IProductDetailRepository
    {
        Task<ProductDetail?> GetByProductIdAsync(int productId);
        Task AddAsync(ProductDetail productDetail);
    }
}
