import { useEffect, useState } from "react";
import "../App.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import axios from "axios";

function HomePage() {
    const [tasks, setTasks] = useState([]);

    // Função para buscar as tarefas
    const fetchTasks = () => {
        axios
            .get("http://localhost:5000/api/get-tasks")
            .then((res) => setTasks(res.data))
            .catch((err) => console.error(err));
    };

    // Buscar tarefas ao carregar o componente
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
                <TaskForm onTaskAdded={fetchTasks} />
                <TaskList tasks={tasks} />
        </>
    );
}

export default HomePage;
