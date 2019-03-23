package solutions.ethio.speedcontrol.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import solutions.ethio.speedcontrol.application.domain.Authority;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String>
{
}
