package solutions.ethio.speedcontrol.application.utils;

import java.util.function.Supplier;

public final class Retryable
{
    public static <T> T retry(Supplier<T> callback, int maxRetries)
    {
        int retriesLeft = maxRetries;

        do
        {
            try
            {
                return callback.get();
            }
            catch (Throwable e)
            {
                if (--retriesLeft < 0)
                {
                    throw e;
                }
            }
        }
        while (true);
    }
}
