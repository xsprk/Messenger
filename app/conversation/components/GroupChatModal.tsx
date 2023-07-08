"use client";

import InputItem from "@/app/(site)/components/InputItem";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Select from "@/app/components/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
};

const GroupChatModal = ({ isOpen, onClose, users }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    toast.loading("Creating group conversation", { id: "1" });
    axios
      .post("/api/conversation", { ...data, isGroup: true })
      .then(() => {
        toast.success("Success, group conversation created", { id: "1" });
        router.refresh();
        onClose();
      })
      .catch((err) => {
        toast.error("Error, failed to create group conversation", { id: "1" });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="space-y-12">
          <div className=" border-b border-gray-900/10 pb-12">
            <div className="flex items-center gap-2"></div>
            <h2
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
            >
              Create a group chat
            </h2>
            <p className="mt-0.5 text-sm leading-6 text-gray-600">
              add 2 or more people other than yourself
            </p>

            <div className="mt-8 flex flex-col gap-y-8">
              <InputItem
                disabled={isLoading}
                id="name"
                errors={errors}
                required
                register={register}
              />
              <Select
                label="Other members"
                disabled={isLoading}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name || "",
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
