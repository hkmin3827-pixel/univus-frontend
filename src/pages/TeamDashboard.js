import TeamCreate from "./TeamCreate";
import TeamInvite from "./TeamInvite";

const TeamDashboard = ({ userEmail }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        팀 관리 대시보드
      </h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* 팀 생성 */}
        <div className="md:w-1/2">
          <TeamCreate userEmail={userEmail} />
        </div>

        {/* 초대 팝업 영역 */}
        <TeamInvite userEmail={userEmail} />
      </div>
    </div>
  );
};

export default TeamDashboard;
