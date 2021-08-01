import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ProfileEditForm } from './ProfileEditForm';
import { Icon, ButtonRound } from '../../components';
import { ContentArea, ProfileSection, ProfileImage, Info, Nickname, MemberId, ButtonSection } from './style';
import { ProfileFormContextProvider, UserContext } from '../../contexts';
import { COLOR, ROUTE } from '../../constants';

export const ProfilePage = () => {
  const { memberId, nickname, profileImage } = useContext(UserContext);
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [isMemberIdCopied, setIsMemberIdCopied] = useState(false);

  const handleClickCopyButton = () => {
    navigator.clipboard.writeText(memberId);
    setIsMemberIdCopied(true);
  };

  return (
    <main>
      <ContentArea>
        <h2>내 프로필이에요.</h2>
        <ProfileSection isButtonVisible={!isEditing}>
          <ProfileImage src={profileImage} alt="친구 프로필 이미지" />

          {isEditing ? (
            <ProfileFormContextProvider initialNickname={nickname} initialMemberId={memberId}>
              <ProfileEditForm closeForm={() => setIsEditing(false)} />
            </ProfileFormContextProvider>
          ) : (
            <Info>
              <Nickname>{nickname}</Nickname>
              <MemberId>
                <span>{memberId}</span>
                <button onClick={handleClickCopyButton}>
                  {isMemberIdCopied ? (
                    <Icon.Check width="16" color={COLOR.PRIMARY_LIGHT} />
                  ) : (
                    <Icon.Copy width="16" hoverColor={COLOR.PRIMARY_LIGHT} />
                  )}
                </button>
              </MemberId>
              <button onClick={() => setIsEditing(true)}>수정하기</button>
            </Info>
          )}
        </ProfileSection>

        <ButtonSection>
          <ButtonRound size="sm" color="gray" onClick={() => history.push(ROUTE.ADDRESS.PATH)}>
            내 주소 목록 보러가기
          </ButtonRound>
          <ButtonRound size="sm" color="gray" onClick={() => history.push(ROUTE.FRIEND.PATH)}>
            내 친구 목록 보러가기
          </ButtonRound>
        </ButtonSection>
      </ContentArea>
    </main>
  );
};
