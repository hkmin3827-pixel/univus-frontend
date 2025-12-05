import useNoticeGuard from "../hooks/useNoticeGuard";

const NoticeGuard = ({ children }) => {
  useNoticeGuard();
  return children;
};

export default NoticeGuard;
