package seeuthere.goodday.member.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.dao.AddressRepository;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Address;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.AddressDeleteRequest;
import seeuthere.goodday.member.dto.AddressRequest;
import seeuthere.goodday.member.dto.AddressResponse;
import seeuthere.goodday.member.dto.AddressUpdateRequest;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.dto.MemberResponse;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;

    public MemberService(MemberRepository memberRepository, AddressRepository addressRepository) {
        this.memberRepository = memberRepository;
        this.addressRepository = addressRepository;
    }

    public Member add(ProfileResponse profile) {
        if (!memberRepository.existsById(profile.getId())) {
            String memberId = generateRandomMemberId();
            return memberRepository.save(
                new Member(profile.getId(), memberId, profile.getNickname(),
                    profile.getProfileImage()));
        }
        return null;
    }

    private String generateRandomMemberId() {
        String memberId = RandomStringUtils.randomAlphabetic(10);
        while (memberRepository.existsByMemberId(memberId)) {
            memberId = RandomStringUtils.randomAlphabetic(10);
        }
        return memberId;
    }

    public Member find(String id) {
        Optional<Member> member = memberRepository.findById(id);
        if (member.isEmpty()) {
            throw new GoodDayException(AuthExceptionSet.NOT_FOUND_USER);
        }
        return member.get();
    }

    @Transactional
    public MemberResponse updateMemberInfo(String id, MemberRequest request) {
        Member member = find(id);
        member.update(request);
        return new MemberResponse(member);
    }

    @Transactional
    public AddressResponse addAddress(String id, AddressRequest request) {
        Member member = find(id);
        Address address = new Address(request.getName(), request.getAddress());
        member.addAddress(address);
        Address savedAddress = addressRepository.save(address);
        return new AddressResponse(savedAddress);
    }

    public List<AddressResponse> findAddress(String id) {
        Member member = find(id);
        List<Address> addresses = member.getAddresses();
        return addresses.stream()
            .map(AddressResponse::new)
            .collect(Collectors.toList());
    }

    @Transactional
    public AddressResponse updateAddress(String id, AddressUpdateRequest request) {
        Member findMember = find(id);
        Address address = findMember
            .updateAddress(request.getId(), request.getName(), request.getAddress());
        return new AddressResponse(address);
    }

    @Transactional
    public void deleteAddress(String id, AddressDeleteRequest request) {
        Member member = find(id);
        member.deleteAddress(request.getId());
        addressRepository.deleteById(request.getId());


    }
}
