namespace Workspace_Management_App.Interface
{
  public class Category
  {
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public string Description { get; set; }
    public decimal? Rating { get; set; }
    public int? Price { get; set; }
    public byte[] Image { get; set; }
  }
}
