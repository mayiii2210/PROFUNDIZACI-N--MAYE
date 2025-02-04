using ProductsApp.Repositories;
using ProductsApp.Models;

namespace ProductsApp.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductDetailRepository _productDetailRepository;     

        public ProductService(IProductRepository productRepository, IProductDetailRepository productDetailRepository)
        {
            _productRepository = productRepository;
            _productDetailRepository = productDetailRepository;
        }

        public async Task<IEnumerable<Products>> GetAllProductsAsync()
            => await _productRepository.GetAllAsync();

        public async Task<Products?> GetProductByIdAsync(int id)
            => await _productRepository.GetByIdAsync(id);

        public async Task AddProductAsync(Products product)
            => await _productRepository.AddAsync(product);

        public async Task UpdateProductAsync(Products product)
        {
            var existingProduct = await _productRepository.GetByIdAsync(product.Id);
            if (existingProduct == null)
                throw new KeyNotFoundException($"Product with ID {product.Id} not found.");

            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.CategoryId = product.CategoryId;

            await _productRepository.UpdateAsync(existingProduct);
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
                throw new KeyNotFoundException($"Product with ID {id} not found.");

            await _productRepository.DeleteAsync(id);
        }

        public async Task<ProductDetail?> GetProductDetailByProductIdAsync(int productId)
        {
            return await _productDetailRepository.GetByProductIdAsync(productId);
        }
        public async Task AddProductDetailAsync(ProductDetail productDetail)
        {
            await _productDetailRepository.AddAsync(productDetail);
        }
    }
}
