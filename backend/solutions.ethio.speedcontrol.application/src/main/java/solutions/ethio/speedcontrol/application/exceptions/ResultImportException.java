package solutions.ethio.speedcontrol.application.exceptions;

public class ResultImportException extends Exception
{
    public ResultImportException(final String message)
    {
        super(message);
    }

    public ResultImportException(final Throwable cause)
    {
        super(cause);
    }

    public ResultImportException(final String message, final Throwable cause)
    {
        super(message, cause);
    }
}
