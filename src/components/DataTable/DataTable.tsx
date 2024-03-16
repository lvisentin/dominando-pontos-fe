
import DeleteButton from '../DeleteButton/DeleteButton';
import { DataTableProps } from './DataTable.model';
import styles from './DataTable.module.css';
import Swal from 'sweetalert2';

export default function DataTable({
  data,
  columns,
  handleDeleteClick,
  header,
  footer,
}: DataTableProps) {
  const rowClasses = `text-sm md:text-md pr-0 py-4 pl-4 md:py-4 md:pl-8`

  function confirmDelete(row: any) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Gostaria de excluir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && handleDeleteClick) {
        handleDeleteClick(row);
      }
    });
  }

  return (
    <div className="card p-0">
      <div className="tableHeader">{header && header}</div>

      <table className={`table w-full ${styles.table}`} style={{ backgroundColor: 'white' }}>
        <thead className="border-none">
          <tr className="border-none">
            {columns.length > 0 &&
              columns.map((column, key) => (
                <th
                  className={`text-left text-sm py-4 pl-4 md:pt-8 md:pb-6 md:pl-8 ${styles.tableHeader}`}
                  key={key}
                  id={`table-header-${column.field}`}
                >
                  {column.name}
                </th>
              ))}
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
                      <td className={`${styles.td} ${rowClasses}`} key={key}>
                        <>{row[column.field]}</>

                      </td>
                    );
                  }

                  return (
                    <td className={`${styles.td} ${rowClasses}`} key={key}>
                      {column.transformData(row)}
                    </td>
                  );
                })}

                <td className={`${styles.td} pr-4 md:p-0`}>
                  <div
                    className={`action__buttons flex items-center justify-center`}
                  >
                    {handleDeleteClick && (
                      <DeleteButton
                        className={`${styles.buttons} ml-2`}
                        onClick={() => confirmDelete(row)}
                        key={'delete'}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {data?.length == 0 && <div className="w-full text-center my-12">Não encontramos nenhum registro.</div>}

      <footer className="tableFooter">{footer && footer}</footer>
    </div>
  );
}
