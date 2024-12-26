
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import{MDBTable,MDBTableHead,MDBTableBody, MDBContainer,MDBRow,MDBCol,MDBPagination,MDBPaginationItem,MDBPaginationLink} from "mdb-react-ui-kit"
import Swal from "sweetalert2";
import "../components/style.css"


export default function Home(){   
  const [students, setStudents] = useState([]);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [paginaLimit] = useState(4);
  

  
  async function getStudents(start,end, increase) {
    const res = await fetch(`/api/students`);
    const data = await res.json();
   
    if (res.ok) {
      setStudents(data);
      setCurrentPage(currentPage+increase);
    }
  }
 
  useEffect(() => {
    getStudents(0,4,0);
  }, []);

  //search student
  const handleSearch=async(e)=>{
    e.preventDefault();
    const res= await fetch(`/api/students/search/${value}`);
    const data = await res.json();
    if (res.ok) {
      setStudents(data);
      setValue("");
    }
  }
  

  //delete student
  async function handleDelete(id) {   
    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete Student!"
      }).then(async(result) => {
        if (result.isConfirmed) {
            const res = await fetch(`/api/students/${id}`, {
              method: "delete",
              headers: {
                'Content-Type': 'application/json'
              },
            });
          if (res.ok) {       
            getStudents();
          }

          Swal.fire({
            title: "Deleted student!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      }); 
     
    }
  }
  const handleReset=()=>{
    getStudents();
  }

  const renderPagination=()=>{
    if(currentPage==0){
      return(
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
              <MDBPaginationLink>1</MDBPaginationLink>
              <button className="bg-blue-800 text-white text-sm mx-2 px-3 py-1" onClick={()=>getStudents(4,8,1)}>Next</button>
          </MDBPaginationItem>
          

        </MDBPagination>
      );
    }else if(currentPage < paginaLimit -1 && students.length==paginaLimit){
        return(

          <MDBPagination className="mb-0">
          <MDBPaginationItem>
              <button className="bg-blue-800 text-white text-sm mx-2 px-3 py-1" onClick={()=>getStudents((currentPage-1)*4,(currentPage*4),-1)}>Prev</button>
          </MDBPaginationItem>
          <MDBPaginationItem>     
              <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>  
              <button className="bg-blue-800 text-white text-sm mx-2 px-3 py-1" onClick={()=>getStudents((currentPage+1)*4,(currentPage + 2)*4,1)}>Next</button>
          </MDBPaginationItem>
          

        </MDBPagination>

        )
    }else{
      return(
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
              <button className="bg-blue-800 text-white text-sm mx-2 px-3 py-1" onClick={()=>getStudents(4,8,-1)}>Prev</button>
          </MDBPaginationItem>
          <MDBPaginationItem>
              <MDBPaginationLink>{currentPage+1}</MDBPaginationLink>             
          </MDBPaginationItem>
          

        </MDBPagination>
      );

    }
  }
  return (
    <MDBContainer>
       <h1 className="text-center my-3">List Students</h1>
       <form style={{padding:"15px",maxWidth:"400px",alignContent:"center" }} className="d-flex input-group w-auto" onSubmit={handleSearch}>
            <div className="flex items-center justify-end gap-4">
                <input type="text" className="form-control" placeholder="Search" value={value} onChange={(e)=>setValue(e.target.value)}/>
          
                <button type="submit" className="bg-blue-500 text-white text-sm  px-3 py-1">Search</button>
                <button onClick={()=>handleReset()}>Reset</button>
            </div>
       </form>
       <div className="space-x-12 text-end my-3">
           <Link to="/create" className="nav-link bg-green-500 text-white text-sm  px-6 py-1">
                Create Student
              </Link>
              
        </div>     

      <MDBRow>
          <MDBCol>
            <MDBTable>
              <MDBTableHead dark>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Birth Date</th>                    
                    <th>Enrollment Date</th>
                    <th>Status</th>
                    <th>Acciones</th>
                  
                  </tr>

              </MDBTableHead>
              {students.length == 0 ? (
          
              <MDBTableBody >
                    <tr>
                        <td>No data found</td>
                    </tr>
              </MDBTableBody>
              
                ) : (
                  students.map((item,index)=>(
                    
                        <MDBTableBody key={index}>
                        <tr>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.birth_date}</td>
                            <td>{item.enrollment_date}</td>
                            <td><span className={`label-${item.status.toLowerCase()}`}>{item.status}</span></td>
                            <td>

                            <div className="flex items-center justify-end gap-4">
                            <Link
                              to={`/students/${item.id}`}
                              className="bg-sky-300 text-white text-sm rounded-lg px-3 py-1"
                                >
                              Read
                          </Link> 
                            <Link
                              to={`/students/update/${item.id}`}
                              className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
                                >
                              Update
                          </Link>                  
                            <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1"  onClick={() => handleDelete(item.id)}
                            >
                            Delete
                            </button>
                      
                        </div>
                            </td>
                          
                        </tr>
                  </MDBTableBody>
                  ))
                )}
            </MDBTable>
          </MDBCol>
      </MDBRow>
    
      <div style={{margin:'auto',  padding:"15px",maxWidth:"200px",alignContent:"center" }}>{renderPagination()}</div>
    </MDBContainer>
  );
}