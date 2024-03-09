"use client";
import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CopyToClipboardComponent from "@/components/copyToClipBoard";
import { ToastProvider } from "@/components/ui/toast";

const GroupLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    groupId: string;
  };
}) => {
  return (
    <div>
      <ToastProvider>
        <GroupNameHeader id={params.groupId} />

        {children}
      </ToastProvider>
    </div>
  );
};

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
      <div className="text-4xl font-bold flex items-center justify-center pt-8">
        {groupName}
      </div>

      <div className="flex justify-center pt-6">
        {members.map((member: { name: string }, index: number) => {
          return (
            <div key={index} className="flex ">
              <div className="text-lg font-bold px-2 "> {member.name}</div>
              {index !== members.length - 1 && "・"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupLayout;
