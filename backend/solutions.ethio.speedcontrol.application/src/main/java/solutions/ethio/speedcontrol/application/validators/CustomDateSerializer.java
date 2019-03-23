package solutions.ethio.speedcontrol.application.validators;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * Custom Jackson serializer for displaying Joda DateTime objects.
 */
public class CustomDateSerializer extends JsonSerializer<Date>
{
    private static SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

    @Override
    public void serialize(Date value, JsonGenerator generator, SerializerProvider serializerProvider) throws IOException
    {
        generator.writeString(dt.format(value));
    }

}
