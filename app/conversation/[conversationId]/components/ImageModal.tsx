import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";

type Props = {
  isOpen: boolean;
  src: string;
  onClose: () => void;
};

const ImageModal = ({ isOpen, src, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image src={src} alt="image in message" className="object-cover" fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
