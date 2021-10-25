package seeuthere.goodday.member.service;

import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.dao.AddressRepository;
import seeuthere.goodday.member.dao.AdminRepository;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.dao.RequestFriendRepository;
import seeuthere.goodday.member.domain.Address;
import seeuthere.goodday.member.domain.Admin;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.domain.RequestFriend;
import seeuthere.goodday.member.dto.AddressDeleteRequest;
import seeuthere.goodday.member.dto.AddressRequest;
import seeuthere.goodday.member.dto.AddressResponse;
import seeuthere.goodday.member.dto.AddressUpdateRequest;
import seeuthere.goodday.member.dto.FriendRequest;
import seeuthere.goodday.member.dto.FriendResponse;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.dto.MemberResponse;
import seeuthere.goodday.member.dto.RequestFriendRequest;
import seeuthere.goodday.member.dto.RequestFriendResponse;
import seeuthere.goodday.member.exception.MemberExceptionSet;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final RequestFriendRepository requestFriendRepository;
    private final AdminRepository adminRepository;

    public MemberService(MemberRepository memberRepository, AddressRepository addressRepository,
        RequestFriendRepository requestFriendRepository, AdminRepository adminRepository) {
        this.memberRepository = memberRepository;
        this.addressRepository = addressRepository;
        this.requestFriendRepository = requestFriendRepository;
        this.adminRepository = adminRepository;
    }

    public Member add(ProfileResponse profile) {
        if (!memberRepository.existsById(profile.getId())) {
            String memberId = generateRandomMemberId();
            return memberRepository.save(
                new Member(profile.getId(), memberId, profile.getNickname(),
                    profile.getProfileImage()));
        }
        return find(profile.getId());
    }

    private String generateRandomMemberId() {
        String memberId = RandomStringUtils.randomAlphabetic(10);
        while (memberRepository.existsByMemberId(memberId)) {
            memberId = RandomStringUtils.randomAlphabetic(10);
        }
        return memberId;
    }

    @Transactional(readOnly = true)
    public Member find(String id) {
        return memberRepository.findById(id)
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.NOT_FOUND_USER));
    }

    @Transactional(readOnly = true)
    public Admin findAdminByMember(Member member) {
        return adminRepository.findAdminByMember(member)
            .orElseThrow(() -> new GoodDayException(MemberExceptionSet.NOT_ADMIN));
    }

    public MemberResponse updateMemberInfo(String id, MemberRequest request) {
        Member member = find(id);
        if (memberRepository.existsByMemberId(request.getMemberId())
            && !member.getMemberId().equals(request.getMemberId())) {
            throw new GoodDayException(MemberExceptionSet.ALREADY_EXIST_MEMBER);
        }
        member.update(request);
        return new MemberResponse(member);
    }

    public AddressResponse addAddress(String id, AddressRequest request) {
        Member member = find(id);
        Address address = new Address.Builder()
            .nickname(request.getNickname())
            .addressName(request.getAddressName())
            .fullAddress(request.getFullAddress())
            .x(request.getX())
            .y(request.getY())
            .build();

        member.addAddress(address);
        return AddressResponse.valueOf(address);
    }

    @Transactional(readOnly = true)
    public List<AddressResponse> findAddress(String id) {
        Member member = find(id);
        List<Address> addresses = member.getAddresses();
        return addresses.stream()
            .map(AddressResponse::valueOf)
            .collect(Collectors.toList());
    }

    public AddressResponse updateAddress(String id, AddressUpdateRequest request) {
        Member findMember = find(id);
        Address address = findMember.updateAddress(
            new Address.Builder()
                .id(request.getId())
                .nickname(request.getNickname())
                .addressName(request.getAddressName())
                .fullAddress(request.getFullAddress())
                .x(request.getX())
                .y(request.getY())
                .build()
        );
        return AddressResponse.valueOf(address);
    }

    public void deleteAddress(String id, AddressDeleteRequest request) {
        Member member = find(id);
        member.deleteAddress(request.getId());
        addressRepository.deleteById(request.getId());
    }

    @Transactional(readOnly = true)
    public List<FriendResponse> findFriends(String id) {
        Member member = find(id);
        return member.getMemberFriends().stream()
            .map(FriendResponse::new)
            .collect(Collectors.toList());
    }

    public void deleteFriend(String id, FriendRequest request) {
        Member member = find(id);
        Member friend = memberRepository.findByMemberId(request.getMemberId());
        member.deleteFriend(friend);
    }

    public MemberResponse searchFriend(String id, String searchWord) {
        Member member = find(id);
        Member findMember = memberRepository.findByMemberId(searchWord);
        if (findMember == null) {
            throw new GoodDayException(MemberExceptionSet.INVALID_MEMBER);
        }
        if (member.getId().equals(findMember.getId())) {
            throw new GoodDayException(MemberExceptionSet.SELF_SEARCH);
        }
        return new MemberResponse(findMember);
    }

    public String createRandomMemberId() {
        String memberId = RandomStringUtils.randomAlphanumeric(8);
        if (memberRepository.existsByMemberId(memberId)) {
            createRandomMemberId();
        }
        return memberId;
    }

    @Transactional(readOnly = true)
    public List<RequestFriendResponse> findReceiveFriends(String receiverId) {
        List<RequestFriend> requestFriends = requestFriendRepository.findByReceiverId(receiverId);
        return requestFriends.stream()
            .map(RequestFriendResponse::new)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<RequestFriendResponse> findRequestFriends(String requesterId) {
        List<RequestFriend> receiveFriends = requestFriendRepository.findByRequesterId(requesterId);
        return receiveFriends.stream()
            .map(RequestFriendResponse::new)
            .collect(Collectors.toList());
    }

    public void requestFriend(String id, FriendRequest friendRequest) {
        Member requester = find(id);
        Member receiver = memberRepository.findByMemberId(friendRequest.getMemberId());
        if (requester.hasFriend(receiver) || requestFriendRepository
            .existsByRequesterIdAndReceiverMemberId(id, friendRequest.getMemberId())) {
            throw new GoodDayException(MemberExceptionSet.ALREADY_REQUEST_FRIEND);
        }
        if (requestFriendRepository.existsByRequesterIdAndReceiverMemberId(receiver.getId(), requester.getMemberId())) {
            throw new GoodDayException(MemberExceptionSet.OPPONENT_ALREADY_REQUEST_FRIEND);
        }
        requestFriendRepository.save(new RequestFriend(requester, receiver));
    }

    public void acceptFriend(String id, RequestFriendRequest request) {
        Member receiver = find(id);
        RequestFriend requestFriend = getRequestFriend(request);
        validateReceiver(receiver, requestFriend);
        requestFriendRepository.deleteById(request.getId());
        Member requester = requestFriend.getRequester();
        receiver.addFriend(requester);
    }

    public void refuseFriend(String id, RequestFriendRequest request) {
        Member receiver = find(id);
        RequestFriend requestFriend = getRequestFriend(request);
        validateReceiver(receiver, requestFriend);
        requestFriendRepository.deleteById(request.getId());
    }

    private RequestFriend getRequestFriend(RequestFriendRequest request) {
        return requestFriendRepository.findById(request.getId())
            .orElseThrow(() -> new GoodDayException(MemberExceptionSet.INVALID_FRIEND_REQUEST));
    }

    private void validateReceiver(Member receiver, RequestFriend requestFriend) {
        if (!requestFriend.getReceiver().getId().equals(receiver.getId())) {
            throw new GoodDayException(MemberExceptionSet.INVALID_FRIEND_REQUEST);
        }
    }

    public void cancelRequest(RequestFriendRequest request) {
        requestFriendRepository.deleteById(request.getId());
    }

    public boolean isAdmin(String memberId) {
        return adminRepository.existsAdminByMemberId(memberId);
    }
}
