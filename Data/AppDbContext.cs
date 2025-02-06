using ProductsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ProductsApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductDetail> ProductsDetails { get; set; }
    }
}