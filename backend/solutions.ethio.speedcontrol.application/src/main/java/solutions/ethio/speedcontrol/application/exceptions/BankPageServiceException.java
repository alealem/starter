package solutions.ethio.speedcontrol.application.exceptions;

public class BankPageServiceException extends Exception
{
    public BankPageServiceException(final String message)
    {
        super(message);
    }

    public BankPageServiceException(final Throwable cause)
    {
        super(cause);
    }

    public BankPageServiceException(final String message, final Throwable cause)
    {
        super(message, cause);
    }
}
