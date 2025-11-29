// src/firebase/storage.js
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqc3jZo2Kj2bgAVgxTC9su0P1N9kLe-Hg",
  authDomain: "kh-mini-project.firebaseapp.com",
  projectId: "kh-mini-project",
  storageBucket: "kh-mini-project.appspot.com",
  messagingSenderId: "106733687469",
  appId: "1:106733687469:web:f094788d000284bafa6c24",
  measurementId: "G-1RW6SQ37MW",
};

// 🔹 hot-reload / 중복 초기화 방지
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// storage 인스턴스
export const storage = firebase.storage();

/**
 * 🔥 프로필 이미지 업로드 함수
 * @param {File} file - 업로드할 이미지 파일
 * @param {string} email - 사용자 이메일 (경로에 사용)
 * @returns {Promise<string>} - 다운로드 URL
 */
export async function uploadProfileImage(file, email) {
  // profile/{email}/{파일명} 경로에 저장
  const fileRef = storage.ref().child(`profile/${email}/${file.name}`);

  // Firebase에 파일 업로드
  await fileRef.put(file);

  // 업로드된 파일의 다운로드 URL 받아오기
  const downloadURL = await fileRef.getDownloadURL();

  return downloadURL;
}
