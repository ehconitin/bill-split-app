import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";

const LiquidateTable = (props: { groupId: string }) => {
  const data = [
    {
      expenseId: "454",
      expenseName: "wdawd",
      lenderName: "adwad",
      localTimestamp: "wdawd",
      amount: 454,
    },
  ];
  const groupId = props.groupId;
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/getLiquidation", { groupId })
      .then((response) => {
        // Use response.data.expenses directly for mapping and total calculation
      })

      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, [groupId]);
  return (
    <div>
      {" "}
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
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default LiquidateTable;
