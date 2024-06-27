type AlerteMessageProps = {
  message: string
  buttonTitle?: string
  action?: () => void
}

function AlertMessage(props: AlerteMessageProps) {
  return (
    <div className="flex justify-center items-center h-10 bg-[#da373c]">
      <div className="flex items-center justify-center gap-4">
        <p className="text-white text-sm font-semibold">{ props.message }</p>
        
        {props.buttonTitle ? (
          <button
            className="border border-white rounded-sm text-xs font-semibold text-white px-2 py-1"
            onClick={props?.action}
          >
            { props.buttonTitle }
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default AlertMessage;