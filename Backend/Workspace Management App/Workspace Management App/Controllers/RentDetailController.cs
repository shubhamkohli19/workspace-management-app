using Workspace_Management_App.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace community_workshop.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RentDetailController : ControllerBase
  {
    private IConfiguration _config;
    public RentDetailController(IConfiguration configuration)
    {
      _config = configuration;
    }

    [HttpPost("addRentDetail")]
    public IActionResult AddRentDetail(RentDetail rentDetail)
    {
      IActionResult response;

      try
      {
        string connectionString = _config.GetConnectionString("DefaultConnection");

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
          connection.Open();

          string query = @"EXEC AddRentDetails @service = @service, @location = @location, @rentDate = @rentDate, @returnDate = @returnDate, @assets = @assets, @email = @email";

          using (SqlCommand command = new SqlCommand(query, connection))
          {
            command.Parameters.AddWithValue("@service", rentDetail.service);
            command.Parameters.AddWithValue("@location", rentDetail.location);
            command.Parameters.AddWithValue("@rentDate", rentDetail.rentDate);
            command.Parameters.AddWithValue("@returnDate", rentDetail.returnDate);
            command.Parameters.AddWithValue("@email", rentDetail.email);
            string assetsString = string.Join(",", rentDetail.assets);
            command.Parameters.AddWithValue("@assets", assetsString);

            int newRentDetailId = Convert.ToInt32(command.ExecuteScalar());

            if (newRentDetailId > 0)
            {
              var successResponse = new { id = newRentDetailId, message = "Rent detail added successfully" };
              response = Ok(successResponse);
            }
            else
            {
              response = BadRequest("Failed to add rent detail");
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
