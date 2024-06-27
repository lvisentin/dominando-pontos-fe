type AlertMessageBaseProps = {
  message: string;
};

type AlertMessageWithButtonProps = {
  buttonTitle: string;
  action: () => void;
} & AlertMessageBaseProps;

type AlertMessageWithoutButtonProps = {
  buttonTitle?: undefined;
  action?: undefined;
} & AlertMessageBaseProps;

type AlertMessageProps = AlertMessageWithButtonProps | AlertMessageWithoutButtonProps;

function AlertMessage(props: AlertMessageProps) {
  return (
    <div className="flex justify-center items-center h-10 bg-[#da373c]">
      <div className="flex items-center justify-center gap-4">
        <p className="text-white text-sm font-semibold">{ props.message }</p>
        
        {props.buttonTitle && (
          <button
            className="border border-white rounded-sm text-xs font-semibold text-white px-2 py-1"
            onClick={props.action}
          >
            {props.buttonTitle}
          </button>
        )}
      </div>
    </div>
  )
}

export default AlertMessage;