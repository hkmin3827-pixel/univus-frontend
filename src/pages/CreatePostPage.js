import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostApi from "../api/PostApi";
import "../styles/CreatePostPage.css";
import { storage } from "../api/Firebase";
import { TeamContext } from "../context/TeamContext";

function CreatePostPage() {
  const { selectedTeam } = useContext(TeamContext);
  const { teamId, boardId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 파일 선택
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);

      const url = await fileRef.getDownloadURL();
      setUrl(url);
      setFileName(file.name);

      alert("업로드 완료");
    } catch (e) {
      console.log(e);
    }
  };

  // 게시글 작성 제출
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력하세요");
      return;
    }

    try {
      const res = await PostApi.createPost(
        boardId,
        title,
        content,
        url,
        fileName
      );
      alert("리포트가 등록되었습니다.");
      navigate(`/team/${teamId}/board/${boardId}/post/detail/${res.data}`); // 저장 후 상세로 이동
    } catch (err) {
      alert("리포트 작성에 실패하였습니다. 다시 시도해주세요. ");
      console.error(err);
    }
  };

  return (
    <div className="create-post-container">
      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate(`/team/${selectedTeam.id}/board/${boardId}`)}
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <h1 className="page-title">새 리포트 작성</h1>

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
            <img src={previewUrl} alt="파일 Upload 준비 완료" />
          </div>
        )}
        <button
          onClick={handleUploadClick}
          disabled={!file}
          className="upload-btn"
        >
          Upload
        </button>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        등록하기
      </button>
    </div>
  );
}

export default CreatePostPage;
