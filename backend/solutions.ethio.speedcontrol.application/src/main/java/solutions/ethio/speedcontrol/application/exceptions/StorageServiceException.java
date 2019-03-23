package solutions.ethio.speedcontrol.application.exceptions;

import lombok.Getter;
import lombok.Setter;

public class StorageServiceException extends Exception
{

    public enum ErrorCode
    {
        TEMPORARY_ERROR, PERMANENT_ERROR;
    }

    @Getter
    @Setter
    private ErrorCode errorCode;

    public StorageServiceException(final String message)
    {
        super(message);
    }

    public StorageServiceException(final Throwable cause)
    {
        super(cause);
    }

    public StorageServiceException(final String message, final Throwable cause)
    {
        super(message, cause);
    }

    public StorageServiceException(final String message, ErrorCode errorCode, final Throwable cause)
    {
        super(message, cause);
        this.errorCode = errorCode;
    }

    @Override
    public String toString()
    {
        return super.toString() + ", ErrorCode: " + errorCode;
    }
}
