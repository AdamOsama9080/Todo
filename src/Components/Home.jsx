import React, { useState, useEffect } from 'react';
import './card.css';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Home() {

  const mail = JSON.parse(localStorage.getItem('userdata'));
  // console.log(mail.email); // This should work as expected

  const [Data, setData] = useState([]);

  const [newnote, setnewnote] = useState({
    email:"",
    title:"",
    description:""
  })

  const [Updatenotic, setUpdatenotic] = useState({
    title:"",
    description:"",
    id:0,
    mail:mail.email
  })

  // console.log(Updatenotic)

  async function fetchData() {
    try {
      const response = await axios.get("http://testone2023-001-site1.htempurl.com/API%20for%20Notes/getallnotes.php?email="+mail.email);
      const result = await response.data.Data;
      // console.log(result)
      setData(result);
      if(response.data.Code === 200 ){
      }else{
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log(Data)

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(Data)

  async function addNote(e){
    // console.log(e.target.value)
    //deep copy
    let noteday = {...newnote}
    //change || action 
    noteday[e.target.name] = e.target.value;
    //Eamil
    const mail = JSON.parse(localStorage.getItem('userdata'));
    noteday["email"] = mail.email;
    //set state
    setnewnote(noteday)
  }

  async function sendNote(e){
    e.preventDefault();
    let response = await axios.post("http://testone2023-001-site1.htempurl.com/API%20for%20Notes/inserttodo.php",newnote);
    console.log(response.data.Code)
    if(response.data.Code === 200){
      let noteform = document.getElementById('note-form');
      noteform.reset();
      fetchData();
    }
  }

  async function deleteNote(id){
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      let response = await axios.get(`http://testone2023-001-site1.htempurl.com/API%20for%20Notes/deletetodo.php?id=${id}&email=${mail.email}`);
      if (response.data.Code === 200){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        fetchData();
      }
    }
  }
  
  function upadateNote(Tit, Desc ,Id) {
    // console.log(id)
    let newUpdateNotice = { ...Updatenotic };
    const inputTitle = document.getElementById("Note-tit");
    const inputDescribtion = document.getElementById("note-con");
  
    inputTitle.value = newUpdateNotice.title = Tit;
    inputDescribtion.value = newUpdateNotice.description = Desc;
  
    // Add event listeners to the input fields
    inputTitle.addEventListener("input", (e) => {
      newUpdateNotice.title = e.target.value;
      setUpdatenotic(newUpdateNotice);
    });
  
    inputDescribtion.addEventListener("input", (e) => {
      newUpdateNotice.description = e.target.value;
      setUpdatenotic(newUpdateNotice);
    });
    newUpdateNotice.id = Id ;  
    setUpdatenotic(newUpdateNotice);
  }

  async function upadateNotes(e){
    e.preventDefault();
    let response = await axios.get(`http://testone2023-001-site1.htempurl.com/API%20for%20Notes/updatetodo.php?id=${Updatenotic.id}&email=${Updatenotic.mail}&description=${Updatenotic.description}&title=${Updatenotic.title}`);
    // console.log(response.data.Code)
    if(response.data.Code === 200){
      fetchData()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your update has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong please try again!',
      })
    }
  }


  return (
  <>
    <div className="d-flex justify-content-end m-5">
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id='add-Notice'>
        <i className="fa-solid fa-plus"></i> Add Notice
      </button>
    </div>
    
    <form onSubmit={sendNote} id='note-form'>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-end">
          <div className="modal-content">
            <div className="modal-header">
              <input onChange={addNote} type="text" className="form-control" placeholder="Note Title" id="Note-Title" name='title' />
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <textarea onChange={addNote} type="text" className="form-control" placeholder="Note Content" id="note-Content" name='description'></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Add Notice</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
    <div className="container bootstrap snippets bootdeys">
      <div className="row">
        <div className="container bootstrap snippets bootdeys">
          <div className="row">
            {Data === null ? (
              <>
                <div className="loader">
                  {/* Your loader content for Data being null */}
                  <>
                    <div class="loader">
                      <div class="box box0"><div></div></div>
                      <div class="box box1"><div></div></div>
                      <div class="box box2"><div></div></div>
                      <div class="box box3"><div></div></div>
                      <div class="box box4"><div></div></div>
                      <div class="box box5"><div></div></div>
                      <div class="box box6"><div></div></div>
                      <div class="box box7"><div></div></div>
                      <div class="ground"><div></div></div>
                      <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="fs-5 text-black">No notices found</div>
                      </div>
                    </div>
                  </>
                </div>
              </>
            ) : Data.length === 0 ? (
              <>
                <div className="loader2"></div>
              </>
            ) : (
              Data.map((note) => (
                <div className="col-md-3 col-sm-6 content-card" key={note.id}>
                  <div className="card-big-shadow">
                    <div className="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                      <div className="content">
                        <h6 className="category mb-3 fs-3 text-white">{note.title}</h6>
                        <p className="description text-black fs-5">
                          {note.description.split("\n").map((line, index) => (
                            <p key={index}>{line}<br/></p>
                          ))}
                        </p>
                        <div className="d-flex justify-content-around">
                          <button onClick={() => deleteNote(note.id)} type="button" className="btn btn-danger">
                            <i className="fa-solid fa-trash-can me-2"></i>
                            Delete
                          </button>
                          <button onClick={() => upadateNote(note.title, note.description, note.id)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i className="fa-solid fa-pencil me-2"></i>
                            Update
                          </button>
                        </div>
                        <form onSubmit={upadateNotes} id='note-form'>
                          <div className="modal fade" id="exampleModal2" show="true" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-end">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <input type="text" className="form-control" placeholder="Note Title" id="Note-tit" name='title' />
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <textarea type="text" className="form-control" placeholder="Note Content" id="note-con" name='description'></textarea>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                  <button type="submit" className="btn btn-primary">update</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  </>
 )
}
