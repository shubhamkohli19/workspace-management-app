using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CraftersCornerAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class getNameController : ControllerBase
  {
    [HttpGet]
    public string Get([BindRequired] string name)
    {
      return "Hello" + name + "!!!!!";
    }
  }
}
