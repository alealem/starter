package solutions.ethio.speedcontrol.application.exceptions;

public class CsvExportException extends Exception
{
    public CsvExportException(final String message)
    {
        super(message);
    }

    public CsvExportException(final Throwable cause)
    {
        super(cause);
    }

    public CsvExportException(final String message, final Throwable cause)
    {
        super(message, cause);
    }
}
