import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function Read() {
    const {id}= useParams()
    const [student, setStudent] = useState([])
    useEffect(() =>{
        axios.get(`http://localhost:8081/read/`+id)
        .then(res => {
            console.log(res)
            setStudent(res.data[0])
        })
        .catch(err => console.error(err))
        // eslint-disable-next-line
    }, [])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-1'>
            <div className='p-2'>
                <h2>Student Detail</h2>
                <h5>{student.id}</h5>
                <h5>{student.nom}</h5>
                <h5>{student.prenom}</h5>
                <h5>{student.telephone}</h5>
            </div>
            <Link to="/" className='btn btn-primary me-2'>Back</Link>
            <Link to={`/edit/${student.id}`} className='btn btn-info'>Edit</Link>
        </div>
    </div>
  )
}

export default Read