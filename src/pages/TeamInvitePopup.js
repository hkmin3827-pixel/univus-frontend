import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const TeamInvitePopup = ({ invite, onAccept, onDecline }) => {
  return (
    <div className="fixed top-4 right-4 w-80 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-50">
      <p className="font-semibold text-gray-800">{invite.teamName}</p>
      <p className="text-sm text-gray-500">초대자: {invite.inviter}</p>
      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={() => onAccept(invite.inviteId)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
        >
          <CheckIcon className="w-4 h-4" />
          수락
        </button>
        <button
          onClick={() => onDecline(invite.inviteId)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
        >
          <XMarkIcon className="w-4 h-4" />
          거절
        </button>
      </div>
    </div>
  );
};

export default TeamInvitePopup;
