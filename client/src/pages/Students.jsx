import React ,{ useEffect, useState }from 'react'
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import Pagination from "../components/Pagination";

const API_URL = "http://localhost:5000/students"; 

const Students = () => {
    const [allData, setAllData] = useState(null) ;
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    useEffect(() => {
      fetchStudents();
    }, [page, limit]);
  
    const fetchStudents = async () => {
      const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
      const data = await res.json();
      console.log(data)
      setStudents(data.students);
      setAllData(data)
    };
   
    const filterData = students?.filter(student => 
        student.name.toLowerCase().includes(search.toLowerCase()) || 
        student.email.toLowerCase().includes(search.toLowerCase())
      );
    console.log(filterData)
  
  return (
    <>
    <div>
    <div className="d-flex gap-2 mb-3">
        <input
            type="text"
            className="form-control w-60"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: "0 0 80%" }} 
        />
        <div> 
            <StudentForm fetchStudents={fetchStudents} />
        </div>
    </div>
      <StudentTable  students={search? filterData : students} fetchStudents={fetchStudents} />
      <Pagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} allData={allData} />
    </div>
    </>
  )
}

export default Students
