
import { DataTableProps } from './DataTable.model';
import styles from './DataTable.module.css';

export default function DataTable({
  data,
  columns,
  handleEditClick,
  handleDeleteClick,
  handlePreviewClick,
  handleCheckboxClick,
  handleUnlinkClick,
  header,
  multiActions = false,
  actions = [],
  footer,
}: DataTableProps) {
  const isUsingActions =
    handleEditClick ||
    handleDeleteClick ||
    handlePreviewClick ||
    handleUnlinkClick;

  // function confirmDelete(row: any) {
  //   Swal.fire({
  //     title: 'Você tem certeza?',
  //     text: 'Gostaria de excluir?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sim, excluir',
  //     cancelButtonText: 'Cancelar',
  //   }).then((result) => {
  //     if (result.isConfirmed && handleDeleteClick) {
  //       handleDeleteClick(row);
  //     }
  //   });
  // }

  function showActions(row: any) {
    const actionMenu = document.getElementById(`actions-menu-${row.id}`);
    actionMenu?.classList.toggle(styles.shown);
  }

  return (
    <div className="card p-0">
      <div className="tableHeader">{header && header}</div>

      <table className={`table w-full ${styles.table}`}>
        <thead className="border-none">
          <tr className="border-none">
            {columns.length > 0 &&
              columns.map((column, key) => (
                <th
                  className={`text-left text-sm pt-8 pb-6 pl-8 ${styles.tableHeader}`}
                  key={key}
                  id={`table-header-${column.field}`}
                >
                  {column.name}
                </th>
              ))}

            {(handleEditClick || handleDeleteClick || handlePreviewClick) && (
              <th
                className={`text-left text-sm pt-8 pb-6 pl-8 ${styles.tableHeader}`}
                id={`table-header-actions`}
              ></th>
            )}
          </tr>
        </thead>

        <tbody>
          {data?.length > 0 &&
            data.map((row, key) => (
              <tr
                id={`table-body-row-${key}`}
                className={` ${styles.tr} ${key % 2 === 0 ? styles.colored : 'bg-white'
                  }`}
                key={key}
              >
                {columns.map((column, key) => {
                  if (!column.transformData) {
                    return (
                      <td className={`${styles.td} px-6 pl-8 text-sm`} key={key}>
                        <>{row[column.field]}</>

                      </td>
                    );
                  }

                  return (
                    <td className={`${styles.td} px-6  pl-8`} key={key}>
                      {column.transformData(row)}
                    </td>
                  );
                })}

                {isUsingActions && !multiActions && (
                  <td className={`${styles.td} px-6  pl-8`}>
                    <div
                      className={`action__buttons flex items-center justify-end`}
                    >
                      {/* {handleEditClick && (
                        <EditButton
                          className={`${styles.buttons}`}
                          onClick={() => handleEditClick(row)}
                          key={'edit'}
                        />
                      )}

                      {handlePreviewClick && (
                        <DetailsButton
                          className={`${styles.buttons} ml-2`}
                          onClick={() => handlePreviewClick(row)}
                          key={'details'}
                        />
                      )}

                      {handleDeleteClick && (
                        <IconButton
                          iconPath="/images/trash.svg"
                          label="Excluir"
                          className={`${styles.buttons} ml-2`}
                          onClick={() => confirmDelete(row)}
                          key={'delete'}
                        />
                      )}

                      {handleUnlinkClick && (
                        <IconButton
                          iconPath="/images/paperclip-slash.svg"
                          label="Desvincular"
                          className={`${styles.buttons} ml-2`}
                          onClick={() => handleUnlinkClick(row)}
                          key={'unlink'}
                        />
                      )} */}
                    </div>
                  </td>
                )}

                {multiActions && (
                  <td className="relative">
                    {/* <ActionDotsIcon
                      id={`actions-icon-${row.id}`}
                      onClick={() => showActions(row)}
                      className={`${styles.actionIcon} cursor-pointer`}
                    /> */}

                    {/* <div
                      id={`actions-menu-${row.id}`}
                      className={`${styles.actionsMenu} flex flex-col w-44 absolute`}
                    >
                      {actions.map((action, index) =>
                        createComponent(
                          'div',
                          {
                            className: styles.action,
                            key: index,
                            onClick: () => action.onClick(row),
                          },
                          action.element
                        )
                      )}
                    </div> */}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {data?.length == 0 && <div className="w-full text-center my-12">Não encontramos nenhum registro.</div>}

      <footer className="tableFooter">{footer && footer}</footer>
    </div>
  );
}
