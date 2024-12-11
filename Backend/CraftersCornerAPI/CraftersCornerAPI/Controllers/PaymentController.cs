using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;
using System.Threading.Tasks;
using CraftersCornerAPI.Interface;
using CraftersCornerAPI.Models;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowSpecificOrigin")]
public class PaymentController : ControllerBase
{
  private readonly StripeSettings _stripeSettings;

  public PaymentController(IOptions<StripeSettings> stripeSettings)
  {
    _stripeSettings = stripeSettings.Value;
  }

  [HttpPost("create-checkout-session")]
  public string CreateCheckoutSession([FromBody] PaymentAmount request)
  {
    string res = string.Empty;
    var options = new SessionCreateOptions
    {
      LineItems = new List<SessionLineItemOptions>
        {
          new SessionLineItemOptions
          {
            PriceData = new SessionLineItemPriceDataOptions
            {
              UnitAmount = request.total,
              Currency = "usd",
              ProductData = new SessionLineItemPriceDataProductDataOptions
              {
                Name = request.productName,
              },
            },
            Quantity = 1,
          },
        },
      Mode = "payment",
      SuccessUrl = "http://localhost:4200/success",
      CancelUrl = "http://localhost:4200/cancel",
    };

    var service = new SessionService();
    Session session = service.Create(options);

    res = session.Url;
    return JsonConvert.SerializeObject(res);
  }
}
