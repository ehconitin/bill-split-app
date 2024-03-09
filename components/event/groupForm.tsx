"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useRecoilState } from "recoil";
import { groupNameAtom } from "@/store/atoms/groupNameAtom";
import { membersAtom, singleMemberAtom } from "@/store/atoms/membersAtom";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Toaster } from "../ui/toaster";

import { useToast } from "../ui/use-toast";

const GroupForm = () => {
  const [groupName, setGroupName] = useRecoilState(groupNameAtom);
  const [members, setMembers] = useRecoilState(membersAtom);
  const [singleMember, setSingleMember] = useRecoilState(singleMemberAtom);
  const { toast } = useToast();
  const router = useRouter();

  function addMembers() {
    if (singleMember) {
      if (members.includes(singleMember)) {
        toast({
          title: `Breaking News: ${singleMember} Stole the Show!`,
          description: `Stop the press! ${singleMember} snagged the seat in our exclusive club. No room for duplicates.😜`,
        });
      } else {
        if (members.length >= 10) {
          toast({
            title: `Perfect Ten Club: No Room for Eleven!`,
            description:
              "Sorry, champ! Our exclusive club has a perfect limit of ten members. No room for eleven, but your audacity deserves a toast. Cheers to pushing limits! 🥂",
          });
        } else {
          setMembers([...members, singleMember]);
          setSingleMember("");
        }
      }
    }
  }

  function removeMember(index: number) {
    var temp = [...members];

    if (index > -1) {
      temp.splice(index, 1);
      setMembers(temp);
    }
  }

  return (
    <div>
      <Toaster />
      <div>
        <Card className="w-[380px] sm:w-[500px]">
          <CardHeader>
            <CardTitle>Create Group</CardTitle>
            <CardDescription>
              Split and manage your bills easily.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <div className="flex">
                  <Input
                    id="name"
                    placeholder="Name of your group"
                    onChange={(e) => {
                      setGroupName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Members</Label>
                <div className="flex">
                  <Input
                    id="name"
                    placeholder="Joe"
                    onChange={(e) => {
                      setSingleMember(e.target.value);
                    }}
                    className=" rounded-tr-none rounded-br-none"
                    value={singleMember}
                  ></Input>
                  <div className="pl-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={addMembers}
                      className="rounded-tl-none rounded-bl-none ring-1 ring-black "
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "404 Cheers: No Page, No Redirect, Just Empty Tabs",
                  description:
                    "Close the tab, my friend! No page to redirect you to – just an abyss of digital emptiness. Bottoms up to the void! 🚫🔗",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!members.length || !groupName) {
                  toast({
                    title: "Oopsie Alert: Someone Missed the Memo!🤷‍♂️",
                  });
                } else {
                  if (members.length <= 1) {
                    toast({
                      title:
                        "The Solo Struggle: When the Bill is Your Only Date",
                      description:
                        "In a world of couple's dinners, here's to facing the solitude of solo bills. Because sometimes, the only companion is the receipt that echoes your single journey. 😢💔",
                    });
                  } else {
                    try {
                      const response = await axios.post(`/api/createGroup`, {
                        groupName,
                        members,
                      });
                      const groupId = response.data.groupId;

                      if (response) {
                        router.replace(`/group/${groupId}`);
                      }
                    } catch (error) {
                      console.log("error");
                    }
                  }
                }
              }}
            >
              Create
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <div className="flex justify-center flex-wrap pt-10 w-[380px] sm:w-[500px]">
          {members.map((member, index) => (
            <div className="py-1 px-0.5" key={index}>
              <div
                className="w-auto  border  border-black rounded-full text-black px-4 py-1 "
                key={index}
              >
                {member}
                <button
                  type="button"
                  className=" rounded-md pl-2  text-black hover:text-gray-500  "
                  onClick={() => {
                    removeMember(index);
                  }}
                >
                  <svg
                    className="h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupForm;
