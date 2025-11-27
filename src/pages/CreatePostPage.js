import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostApi from "../api/PostApi";
import "../styles/CreatePostPage.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../api/Firebase";

function CreatePostPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 파일 선택
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  // 게시글 작성 제출
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력하세요");
      return;
    }

    try {
      // 파일 업로드 자리 (Firebase 연동 시 완성)
      let uploadUrl = null;
      if (file) {
        const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        uploadUrl = await getDownloadURL(storageRef); // Firebase download URL 획득
        console.log("Firebase URL: ", uploadUrl);
      }

      const res = await PostApi.createPost(boardId, title, content, uploadUrl);
      alert("게시글이 등록되었습니다.");
      navigate(`/post/detail/${res.data}`); // 저장 후 상세로 이동
    } catch (err) {
      alert("게시글 작성 실패");
      console.error(err);
    }
  };

  return (
    <div className="create-post-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <h1 className="page-title">새 게시글 작성</h1>

      <input
        className="title-input"
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="content-input"
        placeholder="내용을 작성하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 첨부 파일 */}
      <div className="file-upload-section">
        <label className="file-label">
          📎 파일 첨부
          <input type="file" onChange={handleFileChange} hidden />
        </label>

        {previewUrl && (
          <div className="preview-box">
            <img src={previewUrl} alt="preview" />
          </div>
        )}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        등록하기
      </button>
    </div>
  );
}

export default CreatePostPage;
