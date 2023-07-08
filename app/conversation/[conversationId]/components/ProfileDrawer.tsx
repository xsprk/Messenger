"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import React, { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import ConfirmationModal from "./ConfirmationModal";
import AvatarGroup from "@/app/components/AvatarGroup";

type Props = {
  conversation: Conversation & { users: User[] };
  isOpen: boolean;
  onClose: () => void;
};

const ProfileDrawer = ({ conversation, isOpen, onClose }: Props) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const otherUsers = useOtherUsers(conversation);
  const otherUser = otherUsers[0];

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const createDate = useMemo(() => {
    return format(new Date(conversation.createAt), "PP");
  }, [conversation.createAt]);

  const title = useMemo(() => {
    return conversation.name || otherUser.name;
  }, [conversation.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return "Active";
  }, [conversation]);

  return (
    <>
      <ConfirmationModal
        isOpen={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      />
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className=" z-60" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opcacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-800 bg-opacity-40 z-60" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="  ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="  ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 flex flex-col w-screen max-w-md pointer-events-auto overflow-y-scroll bg-slate-300 p-6 space-y-10 shadow-xl">
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  className="rounded-md bg-slate-300  text-slate-800 hover-ring focus:outline-none blue-focus-ring"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <IoClose size={24} aria-hidden="true" />
                </button>
              </div>
              <div className="flex justify-center">
                <div className="overflow-visible">
                  {conversation.isGroup ? (
                    <AvatarGroup users={otherUsers} />
                  ) : (
                    <Avatar user={otherUsers[0]} />
                  )}
                </div>
              </div>

              <div className="block mx-auto text-center">
                <p className=" -mt-8">{title}</p>
                <p className=" text-sm text-slate-600 align-bottom mt-0.5">
                  {statusText}
                </p>
              </div>

              <div
                className="w-11 h-11 bg-slate-200 rounded-full flex justify-center  mx-auto items-center cursor-pointer hover:bg-rose-500/90"
                onClick={() => setConfirmationOpen(true)}
              >
                <IoTrash size={26} />
              </div>

              <div className="flex justify-center  items-center ">
                <p className="-mt-10  text-slate-700">Delete Conversation</p>
              </div>

              <dl className="text-center ">
                {!conversation.isGroup && (
                  <div className="space-y-10">
                    <div>
                      <dt className=" text-sm text-slate-600 ">Email</dt>
                      <dd className=" text-slate-800 mb-4">
                        {otherUser.email}
                      </dd>
                    </div>
                    <div>
                      <dt className=" text-sm text-slate-600 ">Joined</dt>
                      <dd className="text-6 text-slate-800">
                        <time dateTime={joinedDate}>{joinedDate}</time>
                      </dd>
                    </div>
                  </div>
                )}
                {conversation.isGroup && (
                  <div className="space-y-10">
                    <div>
                      <dt className=" text-sm  text-slate-600 ">Created</dt>
                      <dd className=" text-6  text-slate-800  ">
                        <time dateTime={createDate}>{createDate}</time>
                      </dd>
                    </div>
                    <div>
                      <dt className=" text-sm   text-slate-600 ">Members</dt>
                      <dd className="  text-slate-800 ">
                        {conversation.users.map((user) => (
                          <p className="text-center" key={user.id}>
                            {user.name}
                          </p>
                        ))}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileDrawer;
