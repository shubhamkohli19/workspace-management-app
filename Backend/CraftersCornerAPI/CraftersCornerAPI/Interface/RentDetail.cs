namespace CraftersCornerAPI.Interface
{
  public class RentDetail
  {
    public int id { get; set; }
    public string service { get; set; }
    public string location { get; set; }
    public DateTime rentDate { get; set; }
    public DateTime returnDate { get; set; }
    public string assets { get; set; }
    public string email { get; set; }
  }
}
