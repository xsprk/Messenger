"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

type Props = {};

const ChatForm = (props: Props) => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
    setValue("message", "", { shouldValidate: true });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className="
  px-4
  flex
  items-center
  
  bg-slate-300
  border-t
  border-slate-200
  gap-4
  "
    >
      <div className=" p-1 hover-ring  rounded-full   transition cursor-pointer ring-offset-6 ">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset={"og1qjifw"}
        >
          <HiPhoto size={36} className="text-blue-500 " />
        </CldUploadButton>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex items-center
      gap-4  w-full py-0"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder={"Type your message"}
        />
        <button
          type="submit"
          className="rounded-full
        p-1 pr-2
        bg-slate-300
        hover-ring
        transition
        cursor-pointer"
        >
          <FaPaperPlane className="text-blue-500 text-3xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
