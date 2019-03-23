package solutions.ethio.speedcontrol.application.validators;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import solutions.ethio.speedcontrol.application.AbstractIntegrationTest;

public class EmailAddressValidatorTest extends AbstractIntegrationTest
{
    @Autowired
    EmailAddressValidator cut;

    @Test
    public void shouldValidateFalseForMissingAt()
    {
        assertThat(this.cut.validate("test"), is(false));
    }

    @Test
    public void shouldValidateFalseForMissingDomain()
    {
        assertThat(this.cut.validate("test@"), is(false));
    }

    @Test
    public void shouldValidateFalseForMissingTld()
    {
        assertThat(this.cut.validate("test@test"), is(false));
    }

    @Test
    public void shouldValidateFalseForInvalidCaracter()
    {
        assertThat(this.cut.validate("test@test;test"), is(false));
    }

    @Test
    public void shouldValidateFalseForEmptyString()
    {
        assertThat(this.cut.validate(""), is(false));
    }

    @Test
    public void shouldNormalEmail()
    {
        assertThat(this.cut.validate("christian@innoplexia.com"), is(true));
        assertThat(this.cut.validate("c.schneider@innoplexia.com"), is(true));
        assertThat(this.cut.validate("f00b4r@innoplexia.com"), is(true));
        assertThat(this.cut.validate("christian@inno.plexia.com"), is(true));
        assertThat(this.cut.validate("christian1337@inno.plexia.com"), is(true));
    }
}
