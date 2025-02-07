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

        public async Task<(IEnumerable<Product> items, int totalItems, int totalPages)> GetAllAsync(int page, int size)
        {
            var totalItems = await _context.Products.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)size);

            var items = await _context.Products
                .Include(p => p.Category)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            return (items, totalItems, totalPages);
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductDetail)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, Product product)
        {
            var existingProduct = await _context.Products.Include(p => p.ProductDetail).FirstOrDefaultAsync(p => p.Id == id);

            if (existingProduct == null)
                throw new KeyNotFoundException("Product not found.");

            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.CategoryId = product.CategoryId;

            if (existingProduct.ProductDetail != null && product.ProductDetail != null)
            {
                existingProduct.ProductDetail.Description = product.ProductDetail.Description;
                existingProduct.ProductDetail.Stock = product.ProductDetail.Stock;
                existingProduct.ProductDetail.Weight = product.ProductDetail.Weight;
                existingProduct.ProductDetail.Dimensions = product.ProductDetail.Dimensions;
            }

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Product>> SearchAsync(int? id, string? name, string? categoryName)
        {
            var query = _context.Products.Include(p => p.Category).AsQueryable();

            if (id.HasValue)
                query = query.Where(p => p.Id == id.Value);

            if (!string.IsNullOrEmpty(name))
                query = query.Where(p => p.Name.Contains(name, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrEmpty(categoryName))
                query = query.Where(p => p.Category.Name.Contains(categoryName, StringComparison.OrdinalIgnoreCase));

            return await query.ToListAsync();
        }
    }
}
