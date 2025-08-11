// posts.js
// 👉 화면에 뿌릴 "게시물 리스트"를 미리 적어둔 파일입니다.
// 👉 진짜 서버는 없으니, 여기 배열이 서버라고 생각하고 시작!

export const POSTS = [
  {
    id: 1,                                  // 각 게시물을 구분하는 고유 번호
    user: "coffee_lover",                   // 작성자 이름(아이디 느낌)
    avatar: "https://i.pravatar.cc/100?img=12", // 작성자 아바타(프로필 사진) URL
    image: "https://picsum.photos/seed/latte/600/400", // 본문 이미지 URL
    caption: "아침 라떼 ☕️",               // 글(캡션)
    likes: 12,                              // 좋아요 수(시작값)
    comments: ["맛있겠다!", "라떼아트 예쁘다"], // 댓글 배열(문자열)
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  },
  {
    id: 2,
    user: "cat_daily",
    avatar: "https://i.pravatar.cc/100?img=3",
    image: "https://picsum.photos/seed/kitty/600/400",
    caption: "냥이가 점프!",
    likes: 34,
    comments: ["심쿵", "귀여워요 😻"],
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  },
  {
    id: 3,
    user: "travel_note",
    avatar: "https://i.pravatar.cc/100?img=25",
    image: "https://picsum.photos/seed/beach/600/400",
    caption: "바다 가고 싶다 🌊",
    likes: 7,
    comments: [], // 댓글이 아직 없을 수도 있어요
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  }
];
