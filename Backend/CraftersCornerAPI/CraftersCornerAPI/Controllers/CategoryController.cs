using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;
using CraftersCornerAPI.Interface;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Newtonsoft.Json;
using System.Data;

namespace CraftersCornerAPI.Controllers
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
    public async Task<IActionResult> GetAllServices()
    {
      try
      {
        string connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync();
        IEnumerable<Category> categories = await SelectAllCategories(connection);
        return Ok(categories);
      }
      catch (SqlException sqlEx)
      {
        return StatusCode(StatusCodes.Status500InternalServerError,
            $"Database error occurred: {sqlEx.Message}");
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError,
            $"An unexpected error occurred: {ex.Message}");
      }
    }

    private static async Task<IEnumerable<Category>> SelectAllCategories(SqlConnection connection)
    {
      try
      {
        return await connection.QueryAsync<Category>("SELECT * FROM category");
      }
      catch (Exception ex)
      {
        throw new Exception("Error fetching categories: " + ex.Message, ex);
      }
    }

  }
}
