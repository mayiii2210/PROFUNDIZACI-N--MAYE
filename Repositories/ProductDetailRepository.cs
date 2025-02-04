using ProductsApp.Models;
using Microsoft.EntityFrameworkCore;
using ProductsApp.Data;

namespace ProductsApp.Repositories
{
    public class ProductDetailRepository : IProductDetailRepository
    {
        private readonly AppDbContext _context;

        public ProductDetailRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProductDetail?> GetByProductIdAsync(int productId)
        {
            return await _context.ProductDetails
                                 .FirstOrDefaultAsync(pd => pd.ProductId == productId);
        }

        public async Task AddAsync(ProductDetail productDetail)
        {
            await _context.ProductDetails.AddAsync(productDetail);
            await _context.SaveChangesAsync();
        }
    }
}
