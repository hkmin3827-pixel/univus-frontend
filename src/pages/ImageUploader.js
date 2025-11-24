import React, { useState } from "react";
import { storage } from "../api/Firebase";

const ImageUploader = () => {
  const [file, setFile] = useState(null); // 업로드할 파일
  const [url, setUrl] = useState(""); // 업로드 후 이미지 URL

  // 파일 선택 핸들러
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    const storageRef = storage.ref(); // Firebase Storage 참조
    const fileRef = storageRef.child(file.name); // 파일 저장 위치 지정
    fileRef
      .put(file) // 파일 업로드
      .then(() => {
        console.log("파일 업로드 성공!");
        return fileRef.getDownloadURL(); // 업로드된 파일의 URL 가져오기
      })
      .then((downloadUrl) => {
        console.log("저장된 경로:", downloadUrl);
        setUrl(downloadUrl); // 이미지 URL 상태 업데이트
      })
      .catch((error) => {
        console.error("업로드 중 에러 발생:", error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
      {url && <img src={url} alt="uploaded" />} {/* 업로드된 이미지 미리보기 */}
    </div>
  );
};

export default ImageUploader;
