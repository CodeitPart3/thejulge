import Button from "../Button";

interface ModalButton {
  label: string;
  style: "primary" | "white";
  onClick: () => void;
}

interface Props {
  message: string;
  buttons: ModalButton[];
  onClose: () => void;
}

export default function AlertModalLayout({
  message = "",
  buttons = [],
}: Props) {
  return (
    <div
      className="relative bg-white rounded-lg p-5 
        w-[20.625rem] h-[13.75rem] md:w-[33.75rem] md:h-[15.625rem]"
      onClick={(e) => e.stopPropagation()}
    >
      <p
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        text-black font-normal text-center whitespace-nowrap
        text-[1rem] md:text-[1.125rem]"
      >
        {message}
      </p>

      <div className="absolute bottom-6 left-1/2 md:left-auto md:right-6 md:translate-x-0 -translate-x-1/2">
        <Button
          onClick={buttons[0]?.onClick}
          variant="primary"
          textSize="md"
          className="py-2 px-4 w-[8.625rem] h-[2.625rem] md:w-[7.5rem] md:h-[3rem] cursor-pointer"
        >
          {buttons[0]?.label}
        </Button>
      </div>
    </div>
  );
}
