using ProductsApp.Dtos;
using ProductsApp.Models;
using ProductsApp.Repositories;

namespace ProductsApp.Services
{
    public class ProductService : IProductService
    {
        public readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<(IEnumerable<Product> items, int totalItems, int totalPages)> GetAllProductsAsync(int page, int size) => await _productRepository.GetAllAsync(page, size);

        public async Task<Product?> GetByIdAsync(int id) => await _productRepository.GetByIdAsync(id);

        public async Task AddProductAsync(ProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                CategoryId = productDto.CategoryId,
                ProductDetail = productDto.ProductDetail != null ? new ProductDetail
                {
                    Description = productDto.ProductDetail.Description,
                    Stock = productDto.ProductDetail.Stock,
                    Weight = productDto.ProductDetail.Weight,
                    Dimensions = productDto.ProductDetail.Dimensions
                } : null
            };
            await _productRepository.AddAsync(product);
        }

        public async Task UpdateProductAsync(int id, ProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                CategoryId = productDto.CategoryId,
                ProductDetail = new ProductDetail
                {
                    Description = productDto.ProductDetail.Description,
                    Stock = productDto.ProductDetail.Stock,
                    Weight = productDto.ProductDetail.Weight,
                    Dimensions = productDto.ProductDetail.Dimensions
                }
            };
            await _productRepository.UpdateAsync(id, product);
        }

        public async Task DeleteProductAsync(int id) => await _productRepository.DeleteAsync(id);

        public async Task<IEnumerable<Product>> SearchProductsAsync(int? id, string? name, string? categoryName)
        {
            return await _productRepository.SearchAsync(id, name, categoryName);
        }
    }
}
