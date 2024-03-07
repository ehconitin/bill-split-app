"use client";
import GroupDashboard from "@/components/event/groupDashboard";

import React from "react";
import { RecoilRoot } from "recoil";

export type GroupIdParams = {
  groupId: string;
};

const Group = ({ params }: { params: GroupIdParams }) => {
  console.log(params.groupId);
  return (
    <RecoilRoot>
      <GroupDashboard id={params.groupId} />
    </RecoilRoot>
  );
};

export default Group;
