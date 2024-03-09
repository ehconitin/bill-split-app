"use client";

import React from "react";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { ExpenseTable } from "./expenseTable";
import LiquidateTable from "./liquidateTable";
import { ToastProvider } from "../ui/toast";
import CopyToClipboardComponent from "../copyToClipBoard";
import { Toaster } from "../ui/toaster";

const GroupDashboard = ({ id }: { id: string }) => {
  const router = useRouter();
  const groupId = id;

  return (
    <div>
      <Toaster />
      <div className="flex justify-center pt-3">
        <div className="pr-1">
          <Button
            variant={"outline"}
            className=""
            onClick={() => {
              router.replace(`/editGroup/${groupId}`);
            }}
          >
            <div className="flex justify-center">
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
              edit group details
            </div>
          </Button>
        </div>
        <div className="pl-1">
          <CopyToClipboardComponent text="hi" />
        </div>
      </div>
      <div className="flex justify-center pt-6">
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
              strokeWidth="1.5"
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
      <div className="flex justify-center pt-8">
        <ExpenseTable groupId={groupId} />
      </div>

      <div className="flex justify-center pt-5">
        <LiquidateTable groupId={groupId} />
      </div>
    </div>
  );
};

export default GroupDashboard;
