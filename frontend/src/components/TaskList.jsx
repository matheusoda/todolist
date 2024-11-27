import PropTypes from 'prop-types';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';

const TaskList = ({ tasks }) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const columns = [
        { field: "description", header: "Descrição", filterField: "description" },
        { field: "responsable", header: "Responsável" },
        { field: "status", header: "Status" }
    ];

    return (
        <div className="card">
            <div style={{ marginBottom: "1rem" }}>
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Filtrar pela descrição"
                    className='text-black h-8 pl-2'
                    style={{ width: "100%" }}
                />
            </div>
            <DataTable
                className="transparent-table text-white"
                size="small"
                value={tasks}
                stripedRows
                showGridlines
                tableStyle={{ minWidth: "50rem" }}
                paginator 
                rows={10}
                filter
                filterDisplay="row"
                globalFilter={globalFilter}
                globalFilterFields={['description']}
                rowsPerPageOptions={[5, 10, 25, 50]} 
            >
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable
                        headerStyle={{
                          backgroundColor: 'transparent',
                          color: 'white',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                        style={{ textAlign: 'left', color: "white" }}
                    />
                ))}
            </DataTable>
        </div>
    );
};


TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            responsable: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired
        })
    ).isRequired
};

export default TaskList;
