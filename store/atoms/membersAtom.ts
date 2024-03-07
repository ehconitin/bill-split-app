import { atom } from "recoil";

type AtomMember = string[];
export const membersAtom = atom<AtomMember>({
  key: "membersAtom",
  default: [],
});

export const singleMemberAtom = atom({
  key: "singleMemberAtom",
  default: "",
});
