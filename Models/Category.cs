using System.Text.Json.Serialization;

namespace ProductsApp.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        [JsonIgnore]
        public List<Products> Products { get; set; } = new List<Products>();

    }
}
