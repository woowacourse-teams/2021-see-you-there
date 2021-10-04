package seeuthere.goodday.member.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.member.domain.RequestFriend;

@Repository
public interface RequestFriendRepository extends JpaRepository<RequestFriend, Long> {

    List<RequestFriend> findByReceiverId(String receiverId);

    List<RequestFriend> findByRequesterId(String requesterId);

    @Query("SELECT "
        + "CASE WHEN COUNT(r) > 0 "
        + "THEN TRUE "
        + "ELSE FALSE "
        + "END FROM RequestFriend r "
        + "WHERE r.requester.id = :requesterId "
        + "AND r.receiver.memberId = :receiverId")
    boolean isExistRequest(@Param("requesterId") String id, @Param("receiverId") String memberId);

}

