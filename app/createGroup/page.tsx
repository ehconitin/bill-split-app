"use client";
import EnterGroupId from "@/components/event/enterGroupId";
import GroupForm from "@/components/event/groupForm";
import { ToastProvider } from "@/components/ui/toast";

import React from "react";
import { RecoilRoot } from "recoil";

const CreateEvent = () => {
  return (
    <div className="flex pt-40 justify-center items-center ">
      <div>
        <ToastProvider>
          <RecoilRoot>
            <GroupForm />
            <EnterGroupId />
          </RecoilRoot>
        </ToastProvider>
      </div>
    </div>
  );
};

export default CreateEvent;
