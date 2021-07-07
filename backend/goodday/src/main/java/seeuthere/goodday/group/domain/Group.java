package seeuthere.goodday.group.domain;

import seeuthere.goodday.member.domain.Member;

import java.util.List;

public class Group {
    private Long id;
    private String name;
    private List<Member> members;
    private List<History> histories;
}
