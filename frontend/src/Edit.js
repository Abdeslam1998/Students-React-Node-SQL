import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function Edit() {

    const {id}= useParams();
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get(`http://localhost:8081/read/`+id)
        .then(res => {
            console.log(res)
            setValues({...values, nom: res.data[0].nom, prenom: res.data[0].prenom, telephone: res.data[0].telephone})
        })
        .catch(err => console.error(err))
        // eslint-disable-next-line
    }, [])
    const [values, setValues] =  useState({
        nom:'',
        prenom:'',
        telephone:''
    })

    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put(`http://localhost:8081/edit/`+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-1'>
            <form onSubmit={handleUpdate}>
                <h2>Edit Student</h2>
                <div className='mb-2'>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control' value={values.nom}
                    onChange={e => setValues({...values, nom:e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Prenom</label>
                    <input type="text" placeholder='Enter Prenom' className='form-control' value={values.prenom}
                    onChange={e => setValues({...values, prenom:e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Telephone</label>
                    <input type="text" placeholder='Enter Telephone' className='form-control' value={values.telephone} 
                    onChange={e => setValues({...values, telephone:e.target.value})} />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Edit