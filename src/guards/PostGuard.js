import usePostGuard from "../hooks/usePostGuard";

const PostGuard = ({ children }) => {
  usePostGuard();
  return children;
};

export default PostGuard;
