import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteButtonProps } from './DeleteButton.model';

function DeleteButton(props: DeleteButtonProps) {
  return (
    <button
      disabled={props.disabled}
      {...props}
      className={`btn bg-red-500 hover:bg-red-700 text-white rounded-md px-4 py-2`}
    >
      <FontAwesomeIcon icon={faTrash} color="#fff" />
    </button>
  );
}

export default DeleteButton;
