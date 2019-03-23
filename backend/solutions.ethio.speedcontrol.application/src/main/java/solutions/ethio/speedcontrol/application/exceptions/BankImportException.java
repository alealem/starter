package solutions.ethio.speedcontrol.application.exceptions;

public class BankImportException extends Exception
{
    public BankImportException(final String message)
    {
        super(message);
    }

    public BankImportException(final Throwable cause)
    {
        super(cause);
    }

    public BankImportException(final String message, final Throwable cause)
    {
        super(message, cause);
    }

}
