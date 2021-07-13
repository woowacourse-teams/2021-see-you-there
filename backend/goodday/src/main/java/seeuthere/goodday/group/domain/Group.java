package seeuthere.goodday.group.domain;

import java.util.List;
import seeuthere.goodday.member.domain.Member;

public class Group {

    private Long id;
    private String name;
    private List<Member> members;
    private List<History> histories;
}
