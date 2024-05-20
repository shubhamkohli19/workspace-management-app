using Workspace_Management_App.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Newtonsoft.Json;
using System.Data;

namespace community_workshop.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CategoriesController : ControllerBase
  {
    private IConfiguration _configuration;

    public CategoriesController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    [HttpPost("postService")]
    public IActionResult PostService(Category service)
    {
      IActionResult response;

      try
      {
        string connectionString = _configuration.GetConnectionString("DefaultConnection");

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
          connection.Open();

          string query = @"EXEC InsertService @categoryName, @description, @rating, @ratingWord, @highlights, @image";

          using (SqlCommand command = new SqlCommand(query, connection))
          {
            command.Parameters.AddWithValue("@categoryName", service.categoryName);
            command.Parameters.AddWithValue("@description", service.description);
            command.Parameters.AddWithValue("@rating", service.rating);
            command.Parameters.AddWithValue("@ratingWord", service.ratingWord);
            command.Parameters.AddWithValue("@highlights", service.highlights);
            command.Parameters.AddWithValue("@image", service.image);

            int newServiceId = Convert.ToInt32(command.ExecuteScalar());

            if (newServiceId > 0)
            {
              var successResponse = new { id = newServiceId, message = "Service added successfully" };
              response = Ok(successResponse);
            }
            else
            {
              response = BadRequest("Failed to add Service");
            }
          }
        }
      }
      catch (Exception ex)
      {
        response = StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
      }
      return response;
    }

    [HttpGet("getServices")]
    public async Task<ActionResult<List<Category>>> GetAllServices()
    {
      using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
      IEnumerable<Category> users = await SelectAllCategories(connection);
      return Ok(users);
    }

    private static async Task<IEnumerable<Category>> SelectAllCategories(SqlConnection connection)
    {
      return await connection.QueryAsync<Category>("SELECT * FROM category");
    }
  }
}
