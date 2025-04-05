import React, { useState } from "react";
import EditStudentModal from "./EditStudentModal";
import Swal from "sweetalert2";

const API_URL = "http://localhost:5000/students"; 

const StudentTable = ({ students, fetchStudents }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

  const deleteStudent = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch(`${API_URL}/${id}`, { method: "DELETE" });
          fetchStudents();
          Swal.fire("Deleted!", "The student has been deleted.", "success");
        }
      });
  };
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  return (
    <>
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
     {
        students.length !== 0 ?   <tbody>
        { students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>
            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(student)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      : <div className="alert alert-warning text-center">No students found</div>
     }
    
    </table>
     {showEditModal && (
        <EditStudentModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          student={selectedStudent}
          fetchStudents={fetchStudents}
        />
      )}
   </>
  );
};

export default StudentTable;