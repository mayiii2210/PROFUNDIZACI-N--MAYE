using Microsoft.EntityFrameworkCore;
using ProductsApp.Data;
using ProductsApp.Models;

namespace ProductsApp.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

       public async Task<IEnumerable<Products>> GetAllAsync() =>
            await _context.Products.Include(p => p.Category) 
                                   .Include(p => p.ProductDetail) 
                                   .ToListAsync();


        public async Task<Products?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductDetail)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Products products)
        {
            _context.Products.Add(products);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Products product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with ID {id} not found.");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }


        public async Task<ProductDetail?> GetProductDetailAsync(int productId) =>
            await _context.ProductDetails.FirstOrDefaultAsync(pd => pd.ProductId == productId);
    }
}
