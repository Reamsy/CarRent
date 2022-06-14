import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { UserContext } from '../../App';



export function Driver() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    const [driverPrivjobs, setJobs] = useState([]);

    useEffect(() => {
        //Rendelések lekérése
        axios.get(`http://localhost:3001/getDriverRents/${user.id}`)
            .then((response) => {
                if (response) {
                    setJobs(response.data);
                }
                else {
                    alert(response.data.message);
                }
            })
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        navigate("/")
    }

    return (
        <div className='container'>

            <div className='d-flex flex-row-reverse text-center '>
                <button className='btn btn-primary mt-3' onClick={handleLogout}>Logout</button>
            </div>

            {/*Info texts*/}
            <div className='row text-center'>
                <p className='mt-3'>Wellcome: {user.username}</p>
            </div>

            <Table striped bordered hover className="adminTable">
                <thead>
                    <tr className='text-light text-center'>
                        <th>Start of driver</th>
                        <th>End of driver</th>
                        <th>Car</th>
                        <th>Model</th>
                        <th>Plate Number</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Map of rents*/}
                    {driverPrivjobs.map(rent =>
                        <tr className='text-light text-center' key={rent.id}>
                            <td>{new Date(rent.start_date).toLocaleDateString()}</td>
                            <td>{new Date(rent.end_date).toLocaleDateString()}</td>
                            <td>{rent.brand.toUpperCase()}</td>
                            <td>{rent.model.toUpperCase()}</td>
                            <td>{rent.plateNumber.toUpperCase()}</td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>
        </div>
    )
}