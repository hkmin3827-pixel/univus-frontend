import { createContext, useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    role: "",
    image: "",
  });

  const fetchUser = async () => {
    try {
      const storedId = localStorage.getItem("userId");
      if (!storedId) return;

      const res = await AxiosApi.getUserById(storedId); // GET /users/{id}
      setUser(res.data);
    } catch (err) {
      console.error("사용자 정보 불러오기 실패:", err);
    }
  };

  // 앱 최초 구동 시 자동 실행
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
