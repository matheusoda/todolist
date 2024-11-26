import PropTypes from 'prop-types';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TaskList = ({ tasks }) => {
    const columns = [
        { field: "description", header: "Descrição" },
        { field: "responsable", header: "Responsável" },
        { field: "status", header: "Status" }
    ];

    return (
        <div className="card">
            <DataTable
                className="transparent-table text-white"
                size="small"
                value={tasks}
                stripedRows
                showGridlines
                tableStyle={{ minWidth: "50rem" }}
                paginator 
                rows={10} 
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
