package solutions.ethio.speedcontrol.application.exceptions;

public class BankServiceException extends Exception
{
    public BankServiceException(final String message)
    {
        super(message);
    }

    public BankServiceException(final Throwable cause)
    {
        super(cause);
    }

    public BankServiceException(final String message, final Throwable cause)
    {
        super(message, cause);
    }
}
