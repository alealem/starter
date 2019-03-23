package solutions.ethio.speedcontrol.application.service.dto;

import java.time.Instant;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Value;

import solutions.ethio.speedcontrol.application.validators.Numeric;

@Value(staticConstructor = "of")
public class BankDTO
{
    @Numeric(size = 8, message = "Die BLZ muss aus 8 Zahlen bestehen")
    @Column(length = 8, unique = true)
    @Size(min = 8, max = 8)
    String blz;

    @NotNull(message = "Der Bankname darf nicht leer sein")
    String bankName;
    String street;
    String houseNumber;

    @Numeric(size = 5, message = "Die PLZ muss aus 5 Zahlen bestehen")
    String plz;
    String  city;
    String  organization;
    String  url;
    Instant scanDate;
}
