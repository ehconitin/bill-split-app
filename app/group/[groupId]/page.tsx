"use client";
import GroupDashboard from "@/components/event/groupDashboard";
import { ToastProvider } from "@/components/ui/toast";
import axios from "axios";

import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";

export type GroupIdParams = {
  groupId: string;
};

const Group = ({ params }: { params: GroupIdParams }) => {
  const groupId = params.groupId;
  useEffect(() => {
    axios.post("/api/getGroup", { groupId }).then((response) => {});
  }, []);
  return (
    <ToastProvider>
      <RecoilRoot>
        <GroupDashboard id={params.groupId} />
      </RecoilRoot>
    </ToastProvider>
  );
};

export default Group;
