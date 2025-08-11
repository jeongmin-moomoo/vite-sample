// Post.jsx
// 👉 "게시물 카드" 하나를 그리는 컴포넌트입니다.
// 👉 props로 post(게시물 한 개) 객체를 받아서 화면에 표시해요.

import { useState } from "react";

export default function Post({ post }) {
  // 아래 4개는 화면에서 변하는(기억해야 하는) 값들 → useState 사용
  const [likes, setLikes] = useState(post.likes); // 좋아요 수
  const [liked, setLiked] = useState(false);      // 내가 하트를 눌렀는지 여부
  const [comments, setComments] = useState(post.comments); // 댓글 목록(문자열 배열)
  const [text, setText] = useState("");           // 댓글 입력창의 글자

  // ♥ 버튼을 누르면 호출: liked를 반대로 바꾸고, likes를 +1/-1
  const toggleLike = () => {
    setLiked((prev) => !prev);                // true -> false, false -> true
    setLikes((n) => (liked ? n - 1 : n + 1)); // 이미 눌렀으면 -1, 아니면 +1
  };

  // 댓글 추가: 입력창의 글자(text)를 comments 배열에 붙인다
  const addComment = () => {
    const t = text.trim();     // 공백만 있는지 제거
    if (!t) return;            // 비어있다면 아무 것도 안 함
    setComments((prev) => [...prev, t]); // 기존 배열에 새 댓글 추가
    setText("");               // 입력창 비우기
  };

  return (
    // article: 의미상 "게시물" 같은 블록을 감싸는 HTML 태그
    <article className="post">
      {/* 상단: 아바타 + 사용자명 */}
      <header className="post-header">
        {/* 이미지에 alt는 대체 텍스트(접근성) */}
        <img className="avatar" src={post.avatar} alt={post.user} />
        <span className="user">{post.user}</span>
      </header>

      {/* 본문 이미지: width 100%로 크게 보여줌 */}
      <img className="post-img" src={post.image} alt={post.caption} />

      {/* 좋아요 영역: 하트 버튼 + 좋아요 개수 */}
      <div className="post-actions">
        {/* liked 상태에 따라 클래스명을 바꿔 하트 색을 바꿔요 */}
        <button className={liked ? "heart on" : "heart"} onClick={toggleLike}>
          {/* ♥ 문자는 텍스트. 아이콘 느낌으로 사용 */}
          ♥
        </button>
        <span className="likes">좋아요 {likes}개</span>
      </div>

      {/* 캡션(글) */}
      <div className="caption">
        <b>{post.user}</b> {post.caption}
      </div>

      {/* 댓글 리스트: 배열을 .map으로 돌면서 <li>를 여러 개 생성 */}
      <ul className="comments">
        {comments.map((c, i) => (
          // key는 리스트를 안정적으로 구분하기 위한 리액트 약속
          <li key={i}>{c}</li>
        ))}
      </ul>

      {/* 댓글 입력 박스 */}
      <div className="comment-box">
        <input
          placeholder="댓글 달기..."
          value={text}                         // 입력창에 보여줄 글자(상태 연결)
          onChange={(e) => setText(e.target.value)} // 타이핑할 때마다 상태 갱신
          onKeyDown={(e) => e.key === "Enter" && addComment()} // 엔터로 등록
        />
        <button onClick={addComment}>게시</button>
      </div>
    </article>
  );
}
