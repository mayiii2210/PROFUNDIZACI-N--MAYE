using ProductsApp.Services;
using ProductsApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace ProductsApp.Controllers
{
    [ApiController]
    [Route("/api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Products products)
        {
            await _productService.AddProductAsync(products);
            return CreatedAtAction(nameof(GetById), new { id = products.Id }, products);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Products product)
        {
            await _productService.UpdateProductAsync(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetProductDetail(int id)
        {
            var productDetail = await _productService.GetProductDetailByProductIdAsync(id);
            if (productDetail == null)
                return NotFound();
            return Ok(productDetail);
        }

        [HttpPost("{id}/details")]
        public async Task<IActionResult> AddProductDetail(int id, ProductDetail productDetail)
        {
            productDetail.ProductId = id;
            await _productService.AddProductDetailAsync(productDetail);
            return CreatedAtAction(nameof(GetProductDetail), new { id = productDetail.ProductId }, productDetail);
        }
    }
}
