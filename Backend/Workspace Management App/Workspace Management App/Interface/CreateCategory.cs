using System.ComponentModel.DataAnnotations;

namespace Workspace_Management_App.Interface
{
  public class CreateCategory
  {
    public string CategoryName { get; set; }
    public string Description { get; set; }
    public decimal? Rating { get; set; } // Nullable decimal
    public int? Price { get; set; }  // Nullable integer
    [Required] // Add data annotation for validation
    public IFormFile ImageFile { get; set; }
  }
}
