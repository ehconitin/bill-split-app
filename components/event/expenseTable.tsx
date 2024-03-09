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
      .post("/api/getExpenses", { groupId })
      .then((response) => {
        // Use response.data.expenses directly for mapping and total calculation

        if (response.data.valid) {
          const expenses = response.data.expenses;
          setData(expenses);

          let sum = 0;
          expenses?.forEach((expense: any) => {
            sum = sum + parseInt(expense.amount);
          });
          setTotal(sum);
          const updatedExpenses = expenses.map((expense: any) => ({
            ...expense,
            localTimestamp: moment(expense.createdAt)
              .tz(clientTimezone)
              .format(),
          }));

          setData(updatedExpenses);
        } else {
          return <div>error</div>;
        }
      })

      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, [groupId]); // Include groupId as a dependency if it's used inside the effect

  return (
    <div className=" ">
      <Table className="w-[350px] sm:w-[740px] ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[135px] sm:w-[200px]">
              Expense Name
            </TableHead>
            {/* <TableHead className="w-[346px]">Expense ID </TableHead> */}
            <TableHead className="w-[85px] sm:w-[150px]">Paid by</TableHead>

            <TableHead className="hidden sm:table-cell">Created at</TableHead>

            <TableHead className="text-right w-[80px] sm:w-[182px]">
              Amount
            </TableHead>
            <TableHead className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[229px]">
        <Table className="w-[350px] sm:w-[740px] ">
          <TableBody>
            {data?.map((expense) => (
              <TableRow key={expense.expenseId}>
                <TableCell className="font-medium w-[135px] sm:w-[200px]">
                  {expense.expenseName}
                </TableCell>
                {/* <TableCell className="w-[346px]">{expense.expenseId}</TableCell> */}
                <TableCell className="w-[85px] sm:w-[150px]">
                  {expense.lenderName}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {expense.localTimestamp}
                </TableCell>
                <TableCell className="text-right ">
                  {parseInt(expense.amount).toFixed(2)}
                </TableCell>
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
      <Table className="w-[350px] sm:w-[740px] ">
        <TableFooter>
          <TableRow>
            <TableCell className="w-[320px] sm:w-[690]">Total</TableCell>
            <TableCell className="text-right">₹{total.toFixed(2)}</TableCell>
            <TableCell className="w-[60px] sm:w-[45px]"></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
