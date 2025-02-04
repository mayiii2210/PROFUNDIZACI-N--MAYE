using System.Text.Json.Serialization;

namespace ProductsApp.Models
{
    public class Products
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        [JsonIgnore]
        public ProductDetail? ProductDetail { get; set; } 
    }
}
