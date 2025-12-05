import useBoardGuard from "../hooks/useBoardGuard";

const BoardGuard = ({ children }) => {
  useBoardGuard();
  return children;
};

export default BoardGuard;
