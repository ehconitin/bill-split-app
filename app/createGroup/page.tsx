"use client";
import EnterGroupId from "@/components/event/enterGroupId";
import GroupForm from "@/components/event/groupForm";

import React from "react";
import { RecoilRoot } from "recoil";

const CreateEvent = () => {
  return (
    <div className="flex pt-40 justify-center items-center ">
      <div>
        <RecoilRoot>
          <GroupForm />
          <EnterGroupId />
        </RecoilRoot>
      </div>
    </div>
  );
};

export default CreateEvent;
