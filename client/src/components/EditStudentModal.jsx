import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const EditStudentModal = ({ show, handleClose, student, fetchStudents }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
      setAge(student.age);
    }
  }, [student]);

  const updateStudent = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/students/${student.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age: Number(age) }),
    });
    fetchStudents();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={updateStudent}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="primary" className="ms-2">Update</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStudentModal;