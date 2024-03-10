import { useState, useEffect } from 'react';
import axios from 'axios';

function useTaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => console.error('There was an error fetching the employees:', error));
    }, []);

    return tasks;
}

export default useTaskList;
