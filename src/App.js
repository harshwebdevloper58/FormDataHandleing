//import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  let [Formdata, setFormdata] = useState({
    uname: "",
    uemail: "",
    uphone: "",
    Index: "",
  })

  let [UserData, setUserData] = useState([]);

  let handlechange = (event) => {
    let datachange = event.target.name;
    let datavalue = event.target.value;
    let oldData = { ...Formdata }
    oldData[datachange] = datavalue;
    setFormdata(oldData)
  }

  let handlesubmit = (event) => {
    event.preventDefault();
    if (Formdata.Index === "") {

      let checkuser = UserData.filter((v, i) => v.uemail == Formdata.uemail || v.uphone == Formdata.uphone)
      if(checkuser.length==0){
      let NewFormdata = {
        uname: Formdata.uname,
        uemail: Formdata.uemail,
        uphone: Formdata.uphone,
        Index: "",
      }
      let NewData = [...UserData, NewFormdata]
      setUserData(NewData)
      toast.success("Your data is saved")
    }
    else{
      toast.error("This is already exist")
    }
    }
    else {

      let olddata = UserData;
      let index = Formdata.Index

      let checkuser = UserData.filter((v, i) => (v.uemail == Formdata.uemail || v.uphone == Formdata.uphone) && i != index)
      if (checkuser.length == 0) {
        olddata[index]['uname'] = Formdata.uname
        olddata[index]['uemail'] = Formdata.uemail
        olddata[index]['uphone'] = Formdata.uphone
        setUserData(olddata)
        toast.success("Your data is saved")
      }
      else{
        toast.error("This email or phone already taken")
      }
    }
    setFormdata({
      uname: "",
      uemail: "",
      uphone: "",
      Index: "",
    })
  }

  let deletedata = (index) => {
    let data = UserData.filter((v, i) => i !== index)
    setUserData(data)
  }

  let updatedata = (index) => {

    let data = UserData.filter((v, i) => i == index)[0]
    // console.log(data)
    setFormdata({
      uname: data.uname,
      uemail: data.uemail,
      uphone: data.uphone,
      Index: index,
    })
  }

  return (
    <div className="App">
      <Container className='contant'>
        <Form className='Form' onSubmit={handlesubmit}>
        <ToastContainer/>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={handlechange} name='uname' value={Formdata.uname} placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={handlechange} name='uemail' value={Formdata.uemail} placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>phone</Form.Label>
            <Form.Control type="text" onChange={handlechange} name='uphone' value={Formdata.uphone} placeholder="Phone" />
          </Form.Group>

          <Button variant="primary" type="submit">
            {Formdata.Index !== "" ? "Update" : "Save"}
          </Button>

        </Form>

        <Table className='Table' striped>
          <thead>
            <tr>
              <th>No</th>
              <th>First Name</th>
              <th>email</th>
              <th>phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              UserData.map((v, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{v.uname}</td>
                    <td>{v.uemail}</td>
                    <td>{v.uphone}</td>
                    <td><Button className='m-1' onClick={() => deletedata(i)}>Delete</Button>
                      <Button onClick={() => updatedata(i)}>Update</Button>
                    </td>
                  </tr>)
              })
            }
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
