import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { title } from "process";

const EnterGroupId = () => {
  const [groupId, setGroupId] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  function handleClick() {
    if (groupId) {
      axios.post("/api/getGroup", { groupId }).then((response) => {
        if (response.data.valid) {
          router.replace(`/group/${groupId}`);
        } else {
          toast({
            title: "invalid group id",
          });
        }
      });
    }
  }
  return (
    <div>
      <div className="flex justify-center pt-5">or</div>
      <div className="flex justify-center">Have group code?</div>
      <div className="flex pt-4 shadow-md">
        <Input
          id="name"
          placeholder="Enter group code"
          onChange={(e) => {
            setGroupId(e.target.value);
          }}
          className=" rounded-tr-none rounded-br-none"
        ></Input>
        <div className="">
          <Button
            variant="default"
            size="icon"
            className="rounded-tl-none rounded-bl-none ring-1 ring-black "
            onClick={handleClick}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnterGroupId;
