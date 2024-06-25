import React, { useState } from 'react';
import { useTable } from 'react-table';
import { MdEdit, MdDelete } from 'react-icons/md';

const ListaProductos = () => {
  const [productosVendidos, setProductosVendidos] = useState([
    { id: '1', nombre: 'Pastel', precio: '10', cantidad: '2', fecha: '2023-01-01', fechaExpiracion: '2023-01-10' },
    { id: '2', nombre: 'Galletas', precio: '5', cantidad: '5', fecha: '2023-01-02', fechaExpiracion: '2023-01-12' },
    // Más productos vendidos aquí
  ]);

  const editarProducto = (id) => {
    // Lógica para editar el producto
    alert(`Editar producto con ID: ${id}`);
  };

  const eliminarProducto = (id) => {
    // Lógica para eliminar el producto
    setProductosVendidos(prevProductos => prevProductos.filter(producto => producto.id !== id));
  };

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Producto', accessor: 'nombre' },
      { Header: 'Precio', accessor: 'precio' },
      { Header: 'Cantidad', accessor: 'cantidad' },
      { Header: 'Fecha', accessor: 'fecha' },
      { Header: 'Fecha de Expiración', accessor: 'fechaExpiracion' },
      {
        Header: 'Acciones',
        accessor: 'acciones',
        Cell: ({ row }) => (
          <div style={styles.actionsContainer}>
            <MdEdit
              style={styles.icon}
              onClick={() => editarProducto(row.values.id)}
            />
            <MdDelete
              style={styles.icon}
              onClick={() => eliminarProducto(row.values.id)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: productosVendidos });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div style={styles.container}>
      <table {...getTableProps()} style={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} style={styles.tableRow}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={styles.tableHeader}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={styles.tableRow}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={styles.tableCell}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    minHeight: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    width: '80%',
    borderCollapse: 'collapse',
    marginBottom: 20,
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    color: '#fff',
    padding: 12,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#333',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.3s',
  },
  tableCell: {
    padding: 12,
    textAlign: 'left',
    fontSize: 14,
    color: '#333',
  },
  actionsContainer: {
    display: 'flex',
    gap: 10,
  },
  icon: {
    fontSize: 20,
    cursor: 'pointer',
    color: '#666',
  },
};

export default ListaProductos;
