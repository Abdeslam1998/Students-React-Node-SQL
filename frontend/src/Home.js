import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {

    const [data, setData]= useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.error(err))
    }, [])

    const handleDelete =(id) =>{
        axios.delete('http://localhost:8081/delete/'+id)
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.error(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-1'>
                <h2>Students List</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'>Create</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nom</th>
                            <th>prenom</th>
                            <th>telephone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student, index) => {
                            return <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.nom}</td>
                                <td>{student.prenom}</td>
                                <td>{student.telephone}</td>
                                <td>
                                    <Link to={`/read/${student.id}`} className='btn btn-sm btn-info'>Read</Link>
                                    <Link to={`/edit/${student.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={() => handleDelete(student.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home