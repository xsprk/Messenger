"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed 
              inset-0 
              bg-slate-800 
              bg-opacity-75 
              
            "
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="
              flex 
              min-h-screen 
              items-center 
              justify-center 
              p-6 
              text-center 
              
            "
            >
              <Dialog.Panel
                className="
                  relative 
                  transform 
                  overflow-hidden 
                  rounded-lg 
                  bg-slate-200 
                  px-4 
                  pb-4
                  pt-5 
                  text-left 
                  shadow-xl 
                  transition-all
                  w-full
                  sm:my-8 
                  sm:w-full 
                  sm:max-w-lg 
                  sm:p-6
                "
              >
                <div
                  className="
                    absolute 
                    right-0 
                    top-0 
                    hidden 
                    pr-4 
                    pt-4 
                    sm:block
                    z-10
                  "
                >
                  <button
                    type="button"
                    className="rounded-md bg-slate-200 hover:ring-offset-slate-200 focus:ring-offset-slate-200  text-slate-800 hover-ring focus:outline-none blue-focus-ring"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <IoClose size={24} aria-hidden="true" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
