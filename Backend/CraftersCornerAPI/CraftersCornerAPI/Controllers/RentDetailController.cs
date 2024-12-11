using CraftersCornerAPI.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace CraftersCornerAPI.Controllers
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

          string query = @"EXEC AddRentDetails @service, @location, @rentDate, @returnDate, @assets, @email";

          using (SqlCommand command = new SqlCommand(query, connection))
          {
            command.Parameters.AddWithValue("@service", rentDetail.service);
            command.Parameters.AddWithValue("@location", rentDetail.location);
            command.Parameters.AddWithValue("@rentDate", rentDetail.rentDate);
            command.Parameters.AddWithValue("@returnDate", rentDetail.returnDate);
            command.Parameters.AddWithValue("@email", rentDetail.email);
            command.Parameters.Add("@assets", SqlDbType.NVarChar).Value = JsonConvert.SerializeObject(rentDetail.assets);

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
