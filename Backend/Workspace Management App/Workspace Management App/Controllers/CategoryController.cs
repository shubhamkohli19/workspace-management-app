using Workspace_Management_App.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;

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

    [HttpPost]
    [Route("api/categories")]
    public async Task<IActionResult> CreateCategory([FromForm] CreateCategory model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState.Values.SelectMany(v => v.Errors));
      }

      using (var connection = new SqlConnection("DefaultConnection"))
      {
        await connection.OpenAsync();
        string sql = "INSERT INTO category (categoryName, description, rating, price, image) VALUES (@categoryName, @description, @rating, @price, @image)";
        await connection.ExecuteAsync(sql, new
        {
          categoryName = model.CategoryName,
          description = model.Description,
          rating = model.Rating,
          price = model.Price,
          image = await ReadImageFileAsync(model.ImageFile)
        });
      }

      return CreatedAtRoute("GetCategory", new { id = model.Id }, model);
    }

    private async Task<byte[]> ReadImageFileAsync(IFormFile file)
    {
      if (file == null || file.Length == 0)
      {
        return null;
      }

      using (var memoryStream = new MemoryStream())
      {
        await file.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
      }
    }

  }
}
