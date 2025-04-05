import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const StudentForm = ({ fetchStudents }) => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [parentId, setParentId] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addStudent = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age: Number(age) }),
    });
    fetchStudents();
    setName("");
    setEmail("");
    setAge("");
    handleClose();
  };
  return (
  <>
   <Button variant="success" onClick={handleShow}>Add New Member</Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addStudent}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" placeholder="Parent Id" value={parentId} onChange={(e) => setParentId(e.target.value)} required />
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="primary" className="ms-2">Add</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
  </>
  );
};

export default StudentForm;