import { useEffect,useState} from "react";
import { Link, useParams } from "react-router-dom";

export default function Show() {
   
  const { id } = useParams();
  const [student, setStudent] = useState(null);
 

  async function getStudent() {
    const res = await fetch(`/api/students/${id}`);
    const data = await res.json();
  
    if (res.ok) {
        setStudent(data);
    }
    console.log(data);
  }
 

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <>
        <h1 className="text-center my-3">Descriptión of Students</h1>
      {student ? (
        <div
          key={student.id}
          className="mt-4 p-4 border rounded-md border-dashed border-slate-400"
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="font-bold text-2xl">{student.first_name} {student.last_name}</h2>
              <small className="text-xs text-slate-600">            
               Fecha de Creación: {new Date(student.created_at).toLocaleTimeString()}
              </small>
             
            </div>
          </div>
          <div>
              <p>Birth  Date: {student.birth_date }</p>
              <p>Enrollment Date: {student.enrollment_date }</p>
              <p>Phone: {student.phone }</p>
              <p>Email: {student.email }</p>
              <p>Status: {student.status }</p>

          </div>
         
          

          {student.id && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to={'/'}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Back
              </Link>

              
            </div>
          )}
        </div>
      ) : (
        <p className="title">Post not found!</p>
      )}
    </>
  );
}