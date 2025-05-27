using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using Workspace_Management_App.Interface;

namespace Workspace_Management_App.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SitesController : ControllerBase
  {
    private readonly IConfiguration _configuration;

    public SitesController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    [HttpPost("upload")]
    public IActionResult UploadSite([FromForm] Site site)
    {
      try
      {
     
        return Ok(new { message = "Site uploaded successfully!" });
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
      }
    }
    [HttpPost("addSite")]
    public IActionResult AddRentDetail(Site site)
    {
      IActionResult response;

      try
      {
        string connectionString = _configuration.GetConnectionString("DefaultConnection");

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
          connection.Open();

          string query = @"EXEC InsertLocation @name, @address, @price, @image, @service";

          using (SqlCommand command = new SqlCommand(query, connection))
          {
            command.Parameters.AddWithValue("@name", site.SiteName);
            command.Parameters.AddWithValue("@address", site.Location);
            command.Parameters.AddWithValue("@price", site.Price);
            command.Parameters.AddWithValue("@image", site.Image);
            command.Parameters.AddWithValue("@service", site.Service);

            
            var successResponse = new { id = 10, message = "Rent detail added successfully" };
            response = Ok(successResponse);
            
          }
        }
      }
      catch (Exception ex)
      {
        response = StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
      }
      return response;
    }
  }
}


