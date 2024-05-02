import React, { useState, useEffect } from 'react';
import "font-awesome/css/font-awesome.css";
import DateObject from 'react-date-object';


const Todo = () => {

    const [data, setData] = useState([])

    const [typeTitle, setTypeTitle] = useState("")

    const [inputDate, setInputDate] = useState("")

    const [inputDesc, setInputDesc] = useState("")

    const [titleError, setTitleError] = useState(false)

    const [dateError, setDateError] = useState(false)

    const [descError, setDescError] = useState(false)

    const [editButton, setEditButton] = useState(false)

    const [editId , setEditId] = useState("")

    const fetchData = async () => {

        try {

            const response = await fetch('http://localhost:5000/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();


            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }


    };



    useEffect(() => {
        fetchData();
    }, []);


    const onClickAdd = (e) => {
        e.preventDefault()
        if (typeTitle == "") {
            setTitleError(true)
        }
        else if (inputDate == "") {
            setDateError(true)
        }
        else if (inputDesc == "") {
            setDescError(true)
        } else {
            console.log(typeTitle, inputDate, inputDesc)
            setTitleError(false)
            setDateError(false)
            setDescError(false)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "title": typeTitle,
                    "dueDate": inputDate,
                    "description": inputDesc
                })
            };
            fetch('http://localhost:5000/save', requestOptions)
                .then(async response => {
                    fetchData()
                    setTypeTitle("")
                    setInputDate("")
                    setInputDesc("")
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
       
    }

    const onClickDelete = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "_id": id
            })
        };
        fetch('http://localhost:5000/delete', requestOptions)
            .then(async response => {
                fetchData()
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const onClickEdit = () => {

        if (typeTitle == "") {
            setTitleError(true)
        }
        else if (inputDate == "") {
            setDateError(true)
        }
        else if (inputDesc == "") {
            setDescError(true)
        } else {
            console.log(typeTitle, inputDate, inputDesc)
            setTitleError(false)
            setDateError(false)
            setDescError(false)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({
                    "_id":editId,
                    "title": typeTitle,
                    "dueDate": inputDate,
                    "description": inputDesc
                })
            };
            fetch('http://localhost:5000/update', requestOptions)
                .then(async response => {
                    fetchData()
                    setTypeTitle("")
                    setInputDate("")
                    setInputDesc("")
                    setEditId("")
                    setEditButton(false)

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
       

    }

    const onClickEditPopup = (id) => {

        setEditButton(true)
        setEditId(id)
    }


    return (
        <div className="container">
            <h1>ToDo Application</h1>
            <div className="add-item">
                <form onSubmit={editButton === true ? onClickEdit : onClickAdd} >
                    <div className='add needs-validation'>
                        <div className="mb-3">
                            <label for="formControltask" className="form-label">Task</label>
                            <input type="text" className="form-control" id="formControltask" placeholder="Task" onChange={e => [setTypeTitle(e.target.value) , setTitleError(false)]} value={typeTitle} />
                            {titleError && <p className="text-danger">Invalid Task</p>}

                        </div>
                        <div className="mb-3">
                            <label for="formDate" className="form-label">Due Date</label>
                            <input type="date" className="form-control" id="formDate" placeholder="Due Date" onChange={e => [setInputDate(e.target.value),setDateError(false)]} value = {inputDate}  />
                            {dateError && <p className="text-danger">Invalid Task</p>}
                        </div>
                        <div className="mb-3">
                            <label for="formDesc" className="form-label">Description</label>
                            <textarea className="form-control" id="formDesc" rows="3" onChange={e => [setInputDesc(e.target.value),setDescError(false)]}  value={inputDesc}></textarea>
                            {descError && <p className="text-danger">Invalid Task</p>}
                        </div>
                        <div className="col-auto">

                            {editButton === true ? (
                                <button type="submit" className="btn btn-primary mb-3" >Edit</button>
                            ) : (
                                <button type="submit" className="btn btn-primary mb-3" >Add</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            {/* table data */}

            <table className="table table-success table-striped mt-5">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Due Date</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) =>
                        <tr>
                            <td>{item.title}</td>
                            <td>{new DateObject(item.dueDate).format("DD-MM-YYYY")}</td>
                            <td>{item.description}</td>
                            <td>
                                <i className='fa fa-trash p-3 ' style={{ color: 'red' }} onClick={() => onClickDelete(item._id)}></i>
                                <i className='fa fa-pencil' style={{ color: 'green' }}
                                    onClick={() => [onClickEditPopup(item._id),
                                    setTypeTitle(item.title),
                                    setInputDate(new DateObject(item.dueDate).format("YYYY-MM-DD")),
                                    setInputDesc(item.description)]}></i>
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );
}

export default Todo;