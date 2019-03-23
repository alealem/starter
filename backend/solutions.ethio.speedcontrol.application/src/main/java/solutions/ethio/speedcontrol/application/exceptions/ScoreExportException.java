package solutions.ethio.speedcontrol.application.exceptions;

public class ScoreExportException extends Exception
{
    public ScoreExportException(final String message)
    {
        super(message);
    }

    public ScoreExportException(final Throwable cause)
    {
        super(cause);
    }

    public ScoreExportException(final String message, final Throwable cause)
    {
        super(message, cause);
    }
}
