package solutions.ethio.speedcontrol.application.exceptions;

public class SpcException extends Exception
{
    public SpcException(final String message)
    {
        super(message);
    }

    public SpcException(final Throwable cause)
    {
        super(cause);
    }

    public SpcException(final String message, final Throwable cause)
    {
        super(message, cause);
    }
}
