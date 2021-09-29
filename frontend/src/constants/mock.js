import { getAvatarKey } from '../utils';
import { avatar } from '../assets';

export const MOCK_PARTICIPANT_LIST = [
  {
    id: 0,
    name: '김하루하루',
    address: '서울시 송파구 잠실 루터회관 999-999',
    x: '0.00',
    y: '0.00',
    avatar: avatar.avatar1,
  },
  {
    id: 1,
    name: '임심바심바',
    address: '서울시 송파구 잠실 루터회관 888-888',
    x: '0.00',
    y: '0.00',
    avatar: avatar.avatar2,
  },
  {
    id: 2,
    name: '김멍토멍토',
    address: '서울시 송파구 잠실 루터회관 ',
    x: '0.00',
    y: '0.00',
    avatar: avatar.avatar3,
  },
  {
    id: 3,
    name: '허와입와입',
    address: '서울시 송파구 잠실 루터회관',
    x: '0.00',
    y: '0.00',
    avatar: avatar.avatar4,
  },
  {
    id: 4,
    name: '안춘식춘식',
    address: '서울시 송파구 잠실 루터회관',
    x: '0.00',
    y: '0.00',
    avatar: avatar.avatar5,
  },
  {
    id: 5,
    name: '최영이영이',
    address: '서울시 송파구 잠실 루터회관',
    x: '0.00',
    y: '0.00',
    avatar: avatar.avatar6,
  },
];

export const MOCK_ADDRESS_LIST = [
  { x: '2.0', y: '2.0', addressName: '서울 송파구 잠실동' },
  { x: '2.0', y: '2.0', addressName: '서울 송파구 잠실본동' },
  { x: '2.0', y: '2.0', addressName: '서울 송파구 잠실1동' },
  { x: '2.0', y: '2.0', addressName: '서울 송파구 잠실2동' },
  { x: '2.0', y: '2.0', addressName: '서울 송파구 잠실3동' },
  { x: '2.0', y: '2.0', addressName: '서울 송파구 잠실4동' },
  { x: '2.0', y: '2.0', addressName: '서울 송파구 잠실5동' },
  { x: '2.0', y: '2.0', addressName: '서울 송파구 잠실6동' },
];

export const MOCK_MIDPOINT = { x: 127.06302321147605, y: 37.508822740225305, name: '여기서만나' };

export const MOCK_MY_ADDRESS_LIST = [
  {
    id: 1,
    nickname: '사무실',
    addressName: '위워크 선릉점',
    fullAddress: '서울특별시 강남구 테헤란로 1111',
    x: 127.333333,
    y: 27.333333,
  },
  {
    id: 2,
    nickname: '자택',
    addressName: '잠실 포스코더샵',
    fullAddress: '서울특별시 송파구 올림픽로 444',
    x: 127.333333,
    y: 27.333333,
  },
];

export const MOCK_FRIEND_LIST = [
  {
    memberId: '365kim',
    nickname: '365kim',
    profileImage: avatar[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: '0imbean0',
    nickname: '임심바',
    profileImage: avatar[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: 'daum7766',
    nickname: '김멍토',
    profileImage: avatar[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: 'hybeom0720',
    nickname: '와이빛',
    profileImage: avatar[getAvatarKey()],
    addresses: [],
  },
];

export const MOCK_PATHS = [
  {
    distance: 5108,
    time: 24,
    routes: [
      {
        startX: 126.98170666658032,
        startY: 37.48554983506427,
        startName: '출발점',
        routeName: '걷기',
        endX: 127.00505586501694,
        endY: 37.50339084064414,
        endName: '이수(총신대입구)역',
      },
      {
        startX: 126.98165855092485,
        startY: 37.48523228895472,
        startName: '이수(총신대입구)역',
        routeName: '7호선',
        endX: 127.00505586501694,
        endY: 37.50339084064414,
        endName: '고속터미널역',
      },
      {
        startX: 127.00512380349248,
        startY: 37.504481171220476,
        startName: '고속터미널역',
        routeName: '3호선',
        endX: 127.0137858007543,
        endY: 37.493090537950934,
        endName: '교대역',
      },
      {
        startX: 127.01437401933859,
        startY: 37.49384739492338,
        startName: '교대역',
        routeName: '2호선',
        endX: 127.0279353277511,
        endY: 37.4980170747733,
        endName: '강남역',
      },
      {
        startX: 127.0279353277511,
        startY: 37.4980170747733,
        startName: '강남역',
        routeName: '걷기',
        endX: 127.02740306334805,
        endY: 37.497965736290396,
        endName: '도착점',
      },
    ],
  },
  {
    distance: 6475,
    time: 26,
    routes: [
      {
        startX: 126.98170666658032,
        startY: 37.48554983506427,
        startName: '출발점',
        routeName: '걷기',
        endX: 126.98168304545179,
        endY: 37.477536851817995,
        endName: '이수(총신대입구)역',
      },
      {
        startX: 126.98220098053145,
        startY: 37.4867101837808,
        startName: '이수(총신대입구)역',
        routeName: '4호선',
        endX: 126.98168304545179,
        endY: 37.477536851817995,
        endName: '사당역',
      },
      {
        startX: 126.98157023232763,
        startY: 37.476500562190715,
        startName: '사당역',
        routeName: '2호선',
        endX: 127.0279353277511,
        endY: 37.4980170747733,
        endName: '강남역',
      },
      {
        startX: 127.0279353277511,
        startY: 37.4980170747733,
        startName: '강남역',
        routeName: '걷기',
        endX: 127.02740306334805,
        endY: 37.497965736290396,
        endName: '도착점',
      },
    ],
  },
];

export const MOCK_BOARD_ITEM_LIST = [
  {
    id: 1,
    createTime: '2021-09-17T05:26:23.91719',
    updateTime: '2021-09-17T05:26:23.91719',
    memberId: '0imbean0',
    title: '글 제목이에요',
    content: '제안하는 내용이에요',
    commentResponse: '답변완료',
    type: 'suggestion',
  },
  {
    id: 2,
    createTime: '2021-09-17T05:26:23.91719',
    updateTime: '2021-09-17T05:26:23.91719',
    memberId: '0imbean0',
    title: '핫둘셋넷닷핫둘셋넷닷핫둘셋넷닷핫둘셋넷닷...',
    content: '제안하는 내용이에요',
    commentResponse: null,
    type: 'suggestion',
  },
  {
    id: 3,
    createTime: '2021-09-17T05:26:23.91719',
    updateTime: '2021-09-17T05:26:23.91719',
    memberId: '0imbean0',
    title: '이건 조금 긴 글 제목이에요',
    content: '제안하는 내용이에요',
    commentResponse: '답변완료',
    type: 'suggestion',
  },
  {
    id: 10,
    createTime: '2021-09-17T05:26:23.91719',
    updateTime: '2021-09-17T05:26:23.91719',
    memberId: '0imbean0',
    title: '점이 찍히나 더 길게 씁니다 이거는 진짜로 더 긴 글 제목이에요',
    content: '고쳐달라는 내용이에요',
    commentResponse: null,
    type: 'fix',
  },
];
