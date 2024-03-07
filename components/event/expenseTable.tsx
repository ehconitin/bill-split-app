"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment-timezone";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ExpenseTable = {
  expenseId: string;
  expenseName: string;
  lenderName: string;
  createdAt: string;
  amount: string;
  localTimestamp: string;
};

export const ExpenseTable = (props: { groupId: string }) => {
  const [data, setData] = useState<ExpenseTable[]>();
  const [total, setTotal] = useState(0);
  const groupId = props.groupId;
  const clientTimezone = moment.tz.guess();

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/getExpenses", { groupId })
      .then((response) => {
        // Use response.data.expenses directly for mapping and total calculation
        const expenses = response.data.expenses;
        setData(expenses);

        let sum = 0;
        expenses?.forEach((expense: any) => {
          sum = sum + parseInt(expense.amount);
        });
        setTotal(sum);
        const updatedExpenses = expenses.map((expense: any) => ({
          ...expense,
          localTimestamp: moment(expense.createdAt).tz(clientTimezone).format(),
        }));

        setData(updatedExpenses);
      })

      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, [groupId]); // Include groupId as a dependency if it's used inside the effect

  console.log("data", data);
  return (
    <div className="">
      <Table className="w-[1050px] ">
        <TableCaption>A list of your recent expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Expense Name</TableHead>
            <TableHead>Expense ID</TableHead>
            <TableHead className="w-[150px]">Paid by</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((expense) => (
            <TableRow key={expense.expenseId}>
              <TableCell className="font-medium">
                {expense.expenseName}
              </TableCell>
              <TableCell>{expense.expenseId}</TableCell>
              <TableCell>{expense.lenderName}</TableCell>
              <TableCell>{expense.localTimestamp}</TableCell>
              <TableCell className="text-right">{expense.amount}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">₹{total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
