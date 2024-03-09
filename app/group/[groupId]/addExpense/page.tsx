"use client";
import React, { useEffect, useState } from "react";
import { GroupIdParams } from "../page";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const AddExpense = ({ params }: { params: GroupIdParams }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseLender, setExpenseLender] = useState("");
  const [expenseBorrower, setExpenseBorrower] = useState<string[]>([]);
  const [members, setMembers] = useState([]);
  const router = useRouter();
  const groupId = params.groupId;
  const id = params.groupId;

  const handleCheckboxChange = (memberName: string) => {
    // Check if the member is already selected
    if (expenseBorrower.includes(memberName)) {
      // If selected, remove it from the list
      setExpenseBorrower((prevSelected) =>
        prevSelected.filter((name) => name !== memberName)
      );
    } else {
      // If not selected, add it to the list
      setExpenseBorrower((prevSelected) => [...prevSelected, memberName]);
    }
  };

  useEffect(() => {
    axios.post("/api/getGroup", { groupId }).then((response: any) => {
      setMembers(response.data.memberNames);
    });
  }, [groupId]);
  return (
    <div>
      <div className="flex justify-center pt-10">
        <Card className="w-[350px] sm:w-[500px]">
          <CardHeader>
            <CardTitle>Add expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of expense"
                    onChange={(e) => {
                      setExpenseName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Amount</Label>
                  <Input
                    id="amount"
                    placeholder="Amount"
                    onChange={(e) => {
                      setExpenseAmount(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Payer</Label>
                  <Select
                    onValueChange={(e) => {
                      setExpenseLender(e);
                    }}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {members.map(
                        (member: { name: string }, index: number) => {
                          return (
                            <div key={index} className="flex ">
                              <SelectItem value={member.name}>
                                {member.name}
                              </SelectItem>
                            </div>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="payedfor">Payed for</Label>
                  <div className="flex justify-evenly py-3">
                    {members.map((member: { name: string }, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={member.name}
                            onClick={() => handleCheckboxChange(member.name)}
                            checked={expenseBorrower.includes(member.name)}
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {member.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                router.replace(`/group/${groupId}`);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                axios
                  .post("/api/createExpense", {
                    expenseName,
                    expenseAmount,
                    expenseBorrower,
                    expenseLender,
                    groupId,
                  })
                  .then((response: any) => {
                    if (response.data.message) {
                      router.replace(`/group/${groupId}`);
                    }
                  });
              }}
            >
              Add{" "}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddExpense;
