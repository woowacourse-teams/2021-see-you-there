package seeuthere.goodday.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.member.domain.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
