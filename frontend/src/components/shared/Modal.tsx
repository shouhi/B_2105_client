import { ReactNode } from "react"

type ModalProps = {
  title: string
  content: ReactNode
}

export const Modal = ({title, content}: ModalProps) => {
  return (
    <div className="w-full">
      <div className="
        modalWrapper rounded-lg absolute top-1/2 left-1/2 px-8 py-3 bg-white max-w-xl
        transform -translate-y-1/2 -translate-x-1/2
      ">
        <h3 className="text-md font-bold">
          {title}
        </h3>
        <div>{content}</div>
      </div>
    </div>
  )
}