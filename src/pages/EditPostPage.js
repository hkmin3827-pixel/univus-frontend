import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostApi from "../api/PostApi";
import "../styles/CreatePostPage.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../api/Firebase";

function EditPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [originFileName, setOriginFileName] = useState("");
  const [originFileUrl, setOriginFileUrl] = useState("");

  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const [removeOriginFile, setRemoveOriginFile] = useState(false); // 기존파일 삭제여부

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await PostApi.getPostDetail(postId);
        const post = res.data;

        setTitle(post.title);
        setContent(post.content);
        if (post.fileUrl && post.fileName) {
          setOriginFileName(post.fileName);
          setOriginFileUrl(post.fileUrl);
          setFileUrl(post.fileUrl);
          setFileName(post.fileName);
        }
      } catch (err) {
        console.error("수정 데이터 조회 실패:", err);
      }
    };

    fetchPostDetail();
  }, [postId]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
      setRemoveOriginFile(true);
      setOriginFileUrl("");
      setOriginFileName("");
    }
  };

  const handleUploadClick = async () => {
    if (!file) return;

    try {
      const storageRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setFileUrl(url);
      setFileName(file.name);

      alert("파일 업로드 완료!");
    } catch (e) {
      console.log("업로드 실패:", e);
    }
  };

  const handleRemoveOriginFile = () => {
    setRemoveOriginFile(true);
    setOriginFileName("");
    setOriginFileUrl("");
    setFileUrl("");
    setFileName("");
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await PostApi.updatePost(postId, title, content, fileUrl, fileName);
      alert("게시물 수정 완료!");
      navigate(-1);
    } catch (err) {
      console.log("수정 실패:", err);
    }
  };

  return (
    <div className="create-post-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <h1 className="page-title">게시글 수정</h1>

      <input
        className="title-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="content-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {originFileUrl && (
        <div className="preview-origin">
          <img src={originFileUrl} alt="origin preview" width="200px" />
          <div className="file-bottom-row">
            <span>{originFileName}</span>
            <button
              className="delete-file-btn"
              onClick={handleRemoveOriginFile}
            >
              ✖
            </button>
          </div>
        </div>
      )}
      <div className="file-upload-section">
        <label className="file-label">
          📎 파일 변경
          <input type="file" onChange={handleFileChange} hidden />
        </label>

        {previewUrl && (
          <div className="preview-box">
            <img src={previewUrl} alt="preview" />
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

      <button className="submit-btn" onClick={handleUpdate}>
        수정하기
      </button>
    </div>
  );
}

export default EditPostPage;
