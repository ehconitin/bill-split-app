import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";
import { Settlement } from "@/app/api/getLiquidation/route";

const LiquidateTable = (props: { groupId: string }) => {
  const [data, setData] = useState<Settlement[]>();
  const heading = "how to liquidate";
  const groupId = props.groupId;
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/getLiquidation", { groupId })
      .then((response) => {
        const settlementData: Settlement[] = response.data.settlements;

        setData(settlementData);
        console.log(settlementData);
      })

      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, [groupId]);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>How to liquidate</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-[229px]">
        <Table className="w-[740px] ">
          <TableBody>
            {data?.map((key) => (
              <TableRow key={key.fromId}>
                <TableCell className="font-medium w-[125px] ">
                  {key.fromName}
                </TableCell>
                <TableCell className="w-[75px]">
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
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                </TableCell>

                <TableCell className="w-[325px] ">{key.toName}</TableCell>

                <TableCell className="text-right">
                  ₹{key.amount.toFixed(2)}
                </TableCell>
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
