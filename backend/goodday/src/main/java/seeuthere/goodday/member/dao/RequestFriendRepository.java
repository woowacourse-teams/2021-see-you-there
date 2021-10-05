package seeuthere.goodday.member.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.member.domain.RequestFriend;

@Repository
public interface RequestFriendRepository extends JpaRepository<RequestFriend, Long> {

    List<RequestFriend> findByReceiverId(String receiverId);

    List<RequestFriend> findByRequesterId(String requesterId);

    boolean existsByRequesterIdAndReceiverMemberId(String requesterId, String receiverId);
}

