"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const GroupNameHeader = (props: { id: string }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [groupIdreceived, setGroupIdrecieved] = useState("");
  //setGroupId(props.id);

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
      <div className="text-4xl font-bold flex justify-center pt-10">
        {groupName}
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
    </div>
  );
};

export default GroupNameHeader;
