"use client";
import EnterGroupId from "@/components/event/enterGroupId";
import GroupForm from "@/components/event/groupForm";
import { ToastProvider } from "@/components/ui/toast";

import React from "react";
import { RecoilRoot } from "recoil";

const CreateEvent = () => {
  return (
    <div className="flex pt-20 justify-center items-center sm:pt-40 ">
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
