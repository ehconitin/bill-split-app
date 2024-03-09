"use client";
import { GroupIdParams } from "@/app/group/[groupId]/page";
import EditGroupForm from "@/components/event/editGroupForm";

import { ToastProvider } from "@/components/ui/toast";

import React from "react";
import { RecoilRoot } from "recoil";

const CreateEvent = ({ params }: { params: GroupIdParams }) => {
  const groupId = params.groupId;
  return (
    <div className="flex pt-40 justify-center items-center ">
      <ToastProvider>
        <RecoilRoot>
          <EditGroupForm groupId={groupId} />
        </RecoilRoot>
      </ToastProvider>
    </div>
  );
};

export default CreateEvent;
