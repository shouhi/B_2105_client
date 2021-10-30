export const Loading = () => {
  return (
    <div className="
      loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 my-4
      animate-spin mx-auto
    ">
      <style>
        {`
          .loader {
            border-top-color: #3490dc;
          }
        `}
      </style>
    </div>
  )
}