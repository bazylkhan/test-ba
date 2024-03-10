import { useState, useEffect } from 'react';
import axios from 'axios';

function useEmployees() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => console.error('There was an error fetching the employees:', error));
    }, []);

    return employees;
}

export default useEmployees;
