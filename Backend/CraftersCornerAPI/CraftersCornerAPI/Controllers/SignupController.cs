using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CraftersCornerAPI.Interface;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace CraftersCornerAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SignUpController : ControllerBase
  {
    private IConfiguration _config;

    public SignUpController(IConfiguration configuration)
    {
      _config = configuration;
    }

    [HttpGet("getUsers")]

    public async Task<ActionResult<List<Signup>>> GetAllUsers()
    {
      using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
      IEnumerable<Signup> users = await SelectAllUsers(connection);
      return Ok(users);
    }

    private string GenerateToken(Signup users)
    {
      try
      {

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], null,
            expires: DateTime.Now.AddMinutes(1),
            signingCredentials: credentials
        );

        return token.EncodedPayload;

      }
      catch (Exception ex)
      {
        return ex.ToString();
      }
    }

    [HttpPost("signupUser")]
    public async Task<ActionResult> SignUp([FromBody]Signup user)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
      {
        var existingUser = await connection.QueryFirstOrDefaultAsync<Signup>("EXEC CheckExistingEmail @email = @email", new { user.email });
        if (existingUser != null)
        {
          return Conflict("Email already exists");
        }

        await connection.ExecuteAsync("EXEC AddUser @firstName = @firstName, @lastName = @lastName, @email = @email, @phoneNumber = @phoneNumber, @password = @password", user);
      }
      var token = GenerateToken(user);

      return Ok(new { user, token });
    }

    private static async Task<IEnumerable<Signup>> SelectAllUsers(SqlConnection connection)
    {
      return await connection.QueryAsync<Signup>("EXEC GetAllUser");
    }
  }
}
