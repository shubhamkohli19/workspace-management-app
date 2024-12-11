using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using CraftersCornerAPI.Interface;

namespace CraftersCornerAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LocationsController : ControllerBase
  {
    public IConfiguration _configuration;

    public LocationsController (IConfiguration configuration)
    {
      _configuration = configuration;
    }

    [HttpGet("getLocations")]
    public async Task<ActionResult<List<Location>>> GetAllLocations()
    {
      using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
      IEnumerable<Location> users = await SelectAllLocations(connection);
      return Ok(users);
    }

    private static async Task<IEnumerable<Location>> SelectAllLocations(SqlConnection connection)
    {
      return await connection.QueryAsync<Location>("SELECT * FROM locations");
    }

    [HttpPost("postLocation")]
    public IActionResult PostLocation(Location location)
    {
      IActionResult response;
            try
      {
        string connectionString = _configuration.GetConnectionString("DefaultConnection");

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
          connection.Open();

          string query = @"EXEC InsertService @name, @address, @workspaceNo, @price, @image";

          using (SqlCommand command = new SqlCommand(query, connection))
          {
            command.Parameters.AddWithValue("@name", location.name);
            command.Parameters.AddWithValue("@address", location.address);
            command.Parameters.AddWithValue("@workspaceNo", location.workspaceNo);
            command.Parameters.AddWithValue("@price", location.price);
            command.Parameters.AddWithValue("@image", location.image);

            int newServiceId = Convert.ToInt32(command.ExecuteScalar());

            if (newServiceId > 0)
            {
              var successResponse = new { id = newServiceId, message = "Location added successfully" };
              response = Ok(successResponse);
            }
            else
            {
              response = BadRequest("Failed to add Location");
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
  }
}
