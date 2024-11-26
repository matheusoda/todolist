import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const TaskForm = ({ onTaskAdded }) => {
    const toast = useRef(null);
    const [task, setTask] = useState({
        description: "",
        responsable: "",
        status: "todo"
    });

    const statusToChange = [
        { label: "To Do", value: "todo" },
        { label: "Doing", value: "doing" },
        { label: "Done", value: "done" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task.description === "") {
            return toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Obrigatório preenchimento da descrição",
                life: 3000
            });
        } else if (task.responsable === "") {
            return toast.current.show({
                severity: "error",
                summary: "Erro",
                detail: "Obrigatório preenchimento do responsável",
                life: 3000
            });
        }
        try {
            await axios.post("http://localhost:5000/api/insert-tasks", task);
            toast.current.show({
                severity: "success",
                summary: "Sucesso",
                detail: "Tarefa criada com sucesso",
                life: 3000
            });
            setTask({ description: "", responsable: "", status: "" });
            if (onTaskAdded) {
                onTaskAdded();
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }

    };

    useEffect(() => {
        task;
    }, [task]);

    return (
        <form
            className="flex w-full justify-between items-center gap-4 mb-2"
            onSubmit={handleSubmit}
        >
            <Toast ref={toast} className="text-sm" />
            <InputText
                placeholder="Descrição"
                // required
                value={task.description}
                onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                }
                className="mr-2 text-black h-8"
            />
            <InputText
                // required
                placeholder="Responsável"
                value={task.responsable}
                onChange={(e) =>
                    setTask({ ...task, responsable: e.target.value })
                }
                className="mr-2 text-black h-8"
            />
            <Dropdown
                value={task.status}
                options={statusToChange}
                onChange={(e) => setTask({ ...task, status: e.value })}
                placeholder="Select Status"
                className="mr-2 h-8 items-center"
            />
            <Button className="px-5 py-2" type="submit" severity="success">
                Add Task
            </Button>
        </form>
    );
};

TaskForm.propTypes = {
    onTaskAdded: PropTypes.func.isRequired, // Define que a função é obrigatória
};

export default TaskForm;
