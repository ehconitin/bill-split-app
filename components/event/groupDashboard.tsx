"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import GroupNameHeader from "./groupNameHeader";
import { ExpenseTable } from "./expenseTable";

const GroupDashboard = ({ id }: { id: string }) => {
  const router = useRouter();
  const groupId = id;

  return (
    <div>
      <GroupNameHeader id={id} />
      <div className="flex justify-center pt-7">
        <Button
          className="bg-gray-900"
          onClick={() => {
            router.replace(`/group/${groupId}/addExpense`);
          }}
        >
          <div className="pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>{" "}
          Add expense
        </Button>
      </div>
      <div className="flex justify-center pt-20">
        <ExpenseTable groupId={groupId} />
      </div>
    </div>
  );
};

export default GroupDashboard;
