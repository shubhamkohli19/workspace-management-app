using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DateOnlyJsonConvert : JsonConverter<DateOnly>
{
  private const string DateFormat = "yyyy-MM-dd";

  public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    var value = reader.GetString();
    return DateOnly.ParseExact(value, DateFormat);
  }

  public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
  {
    writer.WriteStringValue(value.ToString(DateFormat));
  }
}
