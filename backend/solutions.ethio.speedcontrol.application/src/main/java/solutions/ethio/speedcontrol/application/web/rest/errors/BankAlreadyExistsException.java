package solutions.ethio.speedcontrol.application.web.rest.errors;

public class BankAlreadyExistsException extends BadRequestAlertException
{

    private static final long serialVersionUID = 1L;

    public BankAlreadyExistsException()
    {
        super(ErrorConstants.BLZ_ALREADY_USED_TYPE, "Bank with blz is already existing!", "Bank", "blz_exists");
    }
}
