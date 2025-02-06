using ProductsApp.Data;
using ProductsApp.Models;
using Microsoft.EntityFrameworkCore;

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
            var totalPages = (int)Math.Ceiling((double)totalItems / size);
            var products = await _context.Products
                .Include(pd => pd.Category)
                .Include(pd => pd.ProductDetail)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
            return (products, totalItems, totalPages);
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(pd => pd.Category)
                .Include(pd => pd.ProductDetail)
                .FirstOrDefaultAsync(pd => pd.Id == id);
        }

        public async Task AddAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, Product product)
        {
            var productExist = await _context.Products
                .Include(p => p.ProductDetail)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (productExist == null)
            {
                throw new KeyNotFoundException($"El producto con ID {id} no existe.");
            }

            productExist.Name = product.Name;
            productExist.Price = product.Price;

            productExist.ProductDetail = product.ProductDetail != null ? new ProductDetail
            {
                Description = product.ProductDetail.Description,
                Stock = product.ProductDetail.Stock,
                Weight = product.ProductDetail.Weight,
                Dimensions = product.ProductDetail.Dimensions
            } : null;

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
    }
}