using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Workspace_Management_App.Interface;

namespace Workspace_Management_App.Controllers
{
  [Route("api/Login")]
  [ApiController]
  public class LoginController : ControllerBase
  {
    private readonly IConfiguration _configuration;

    public LoginController(IConfiguration configuration)
    {
      _configuration = configuration;
    }
    private Login AuthenticateUser(Login user)
    {
      using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
      connection.Open();
      var query = "Exec AuthenticateUser @email = @email, @password = @password";
      var result = connection.QueryFirstOrDefault<Login>(query, new { email = user.email, password = user.password });
      connection.Close();
      return result;
    }

    private string GenerateToken(Login users)
    {
      try
      {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], null,
            expires: DateTime.Now.AddMinutes(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);

      }
      catch (Exception ex)
      {
        return ex.ToString();
      }
    }

    [HttpPost("postUser")]
    public async Task<ActionResult> LoginUser([FromBody] Login user)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var authenticatedUser = AuthenticateUser(user);
      if (authenticatedUser != null)
      {
        var token = GenerateToken(authenticatedUser);
        using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        var query = "EXEC AuthenticateUser @email = @email, @password = @password";
        var userData = connection.QueryFirstOrDefault<Signup>(query, new { email = user.email, password = user.password });
        return Ok(new { token, userData });
      }
      else
      {
        return Unauthorized();
      }
    }
  }
}
