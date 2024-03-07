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
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { ScrollArea } from "../ui/scroll-area";

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
      <Table className="w-[720px] ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Expense Name</TableHead>
            {/* <TableHead className="w-[346px]">Expense ID </TableHead> */}
            <TableHead className="w-[150px]">Paid by</TableHead>
            <TableHead className="w-[220px]">Created at</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[229px]">
        <Table className="w-[740px] ">
          <TableBody>
            {data?.map((expense) => (
              <TableRow key={expense.expenseId}>
                <TableCell className="font-medium w-[200px]">
                  {expense.expenseName}
                </TableCell>

                {/* <TableCell className="w-[346px]">{expense.expenseId}</TableCell> */}
                <TableCell className="w-[150px]">
                  {expense.lenderName}
                </TableCell>
                <TableCell className="w-[280px]">
                  {expense.localTimestamp}
                </TableCell>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Table className="w-[720px] ">
        <TableFooter>
          <TableRow>
            <TableCell className="w-[630px]">Total</TableCell>
            <TableCell className="">₹{total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
