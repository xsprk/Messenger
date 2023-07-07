"use client";

import { User } from "@prisma/client";
import React, { useState } from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import InputItem from "@/app/(site)/components/InputItem";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
};

const SettingsModal = ({ isOpen, onClose, currentUser }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info.secure_url),
      {
        shouldValidate: true,
      };
  };

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    toast.loading("Updating User", { id: "1" });
    axios
      .post("/api/settings", data)
      .then(() => {
        toast.success("User updated", { id: "1" });
        router.refresh();
        onClose();
      })
      .catch((err) => toast.error("Something went wrong,", { id: "1" }))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 flex flex-col gap-y-8">
              <InputItem
                disabled={isLoading}
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor="photo"
                  className="
                    font-medium 
                    leading-6 
                    text-slate-800
                  "
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset={"og1qjifw"}
                  >
                    <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          "
        >
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
