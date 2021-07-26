package seeuthere.goodday.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import seeuthere.goodday.member.domain.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
