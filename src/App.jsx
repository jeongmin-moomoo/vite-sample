// App.jsx
// 👉 화면 전체의 뼈대 역할. 여기서 posts 배열을 받아 Post 컴포넌트 여러 개 렌더링.

import "./App.css";         // 스타일 가져오기
import { POSTS } from "./data/posts"; // 게시물 데이터 배열
import Post from "./components/Post"; // 게시물 카드 컴포넌트

export default function App() {
  return (
    <div className="container">
      {/* 상단 바 */}
      <header className="topbar">
        <h1>Mini Insta 📸</h1>
      </header>

      {/* 피드 영역: 게시물 목록을 세로로 쭉 나열 */}
      <main className="feed">
        {/* POSTS 배열을 map으로 돌며 Post 컴포넌트를 반복 렌더링 */}
        {POSTS.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </main>
    </div>
  );
}

case 'support': page = renderSupport(); break;   // ← 추가
