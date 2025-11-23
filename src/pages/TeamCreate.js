import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import TeamApi from "../api/TeamApi";

const TeamCreate = ({ userEmail }) => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      setMessage("⚠️ 팀 이름을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await TeamApi.createTeam(teamName, description, userEmail);
      setMessage("✅ 팀 생성 성공!");
      setTeamName("");
      setDescription("");

      setTimeout(() => {
        setMessage("");
        navigate("/home");
      }, 1500);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "팀 생성 실패"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <PlusCircleIcon className="w-6 h-6 text-blue-500" />팀 생성
      </h2>

      <label className="block font-semibold mb-2">팀 이름</label>
      <input
        className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="팀 이름 입력"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        disabled={loading}
      />

      <label className="block font-semibold mb-2">팀 소개</label>
      <textarea
        className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
        placeholder="팀 소개 입력"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        rows={4}
      />

      <button
        onClick={handleCreateTeam}
        disabled={loading}
        className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "생성 중..." : "팀 생성"}
      </button>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes("성공") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default TeamCreate;
