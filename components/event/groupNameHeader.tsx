"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import CopyToClipboardComponent from "../copyToClipBoard";
import { ToastProvider } from "../ui/toast";

const GroupNameHeader = (props: { id: string }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [groupIdreceived, setGroupIdrecieved] = useState("");
  //setGroupId(props.id);
  const router = useRouter();
  const groupId = props.id;

  useEffect(() => {
    axios.post("/api/getGroup", { groupId }).then((response: any) => {
      setGroupName(response.data.groupDetails.name);
      setGroupIdrecieved(response.data.groupDetails.groupId);
      setMembers([]);
      setMembers(response.data.memberNames);
    });
  }, []);
  return (
    <div>
      <ToastProvider>
        <div className="text-4xl font-bold flex items-center justify-center pt-10">
          {groupName}

          <button
            className=" hover:bg-gray-100 rounded-full  "
            onClick={() => {
              router.replace(`/editGroup/${groupId}`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <div className="pb-2">
            <CopyToClipboardComponent text={groupId} />
          </div>
        </div>

        <div className="flex justify-center pt-7">
          {members.map((member: { name: string }, index: number) => {
            return (
              <div key={index} className="flex ">
                <div className="text-lg font-bold px-2 "> {member.name}</div>
                {index !== members.length - 1 && "・"}
              </div>
            );
          })}
        </div>
      </ToastProvider>
    </div>
  );
};

export default GroupNameHeader;
