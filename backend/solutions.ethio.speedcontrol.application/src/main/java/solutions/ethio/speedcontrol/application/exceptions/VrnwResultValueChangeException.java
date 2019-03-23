package solutions.ethio.speedcontrol.application.exceptions;

public class VrnwResultValueChangeException extends Exception
{
    public VrnwResultValueChangeException(final String message)
    {
        super(message);
    }

    public VrnwResultValueChangeException(final Throwable cause)
    {
        super(cause);
    }

    public VrnwResultValueChangeException(final String message, final Throwable cause)
    {
        super(message, cause);
    }
}
