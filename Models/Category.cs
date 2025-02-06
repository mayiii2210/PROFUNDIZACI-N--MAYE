using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsApp.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Column(TypeName = "text")]
        public string Name { get; set; } = string.Empty;
    }
}