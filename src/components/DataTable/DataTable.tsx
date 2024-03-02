
import { DataTableProps } from './DataTable.model';
import styles from './DataTable.module.css';

export default function DataTable({
  data,
  columns,
  handleEditClick,
  handleDeleteClick,
  handlePreviewClick,
  header,
  footer,
}: DataTableProps) {

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
              </tr>
            ))}
        </tbody>
      </table>
      {data?.length == 0 && <div className="w-full text-center my-12">Não encontramos nenhum registro.</div>}

      <footer className="tableFooter">{footer && footer}</footer>
    </div>
  );
}
