import { useEffect,useState } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";

export default function Update(){
        const { id } = useParams();
        const navigate = useNavigate(); 
        const today = new Date().toISOString().split('T')[0];        
        const[formData,setFormData]=useState({
                first_name: "", 
                last_name: "", 
                email: "", 
                phone: "", 
                birth_date: "", 
                enrollment_date: today, 
                status:""
            });
        const [errors, setErrors] = useState({});


        async function getStudent() {
            const res = await fetch(`/api/students/${id}`);
            const data = await res.json();
          
            if (res.ok) {
                setFormData({
                    first_name: data.first_name, 
                    last_name: data.last_name, 
                    email: data.email,
                    phone: data.phone, 
                    birth_date: data.birth_date, 
                    enrollment_date: data.enrollment_date, 
                    status:data.status

                });
            }
            console.log(data);
          }
        
        async function handleUpdate(e){
            e.preventDefault();
            const res= await fetch(`/api/students/${id}`, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(formData),
                });
            const data=await res.json();

            console.log(data);
            if (data.errors) {
                setErrors(data.errors)
            } else {
                navigate('/')
            }
           
        }
        useEffect(() => {
            getStudent();
          }, []);
    return(

        <>
            <h1 className="text-center my-3">Actualizar Estudiante</h1>
            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
              <div>
                <label htmlFor="first_name">First name:</label>
                <input type="text" placeholder="first_name" value={formData.first_name} onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })}/>
               {errors.first_name && <p className="error">{errors.first_name[0]}</p>}
               
              </div>
              <div>
                <label htmlFor="last_name">Last name:</label>
                <input type="text" placeholder="last_name" value={formData.last_name} onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })}/>
              {errors.last_name && <p className="error">{errors.last_name[0]}</p>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="text" placeholder="email" value={formData.email} onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }/>
            {errors.email && <p className="error">{errors.email[0]}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="text" placeholder="phone" value={formData.phone} onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }/>
            {errors.phone && <p className="error">{errors.phone[0]}</p>}
              </div>
              <div>
                <label htmlFor="">Birth date:</label>
                <input type="text" placeholder="birth_date" value={formData.birth_date} onChange={(e) =>
              setFormData({ ...formData, birth_date: e.target.value })
            }/>
            {errors.birth_date && <p className="error">{errors.birth_date[0]}</p>}
              </div>
              <div>
                <input type="hidden" placeholder="enrollment_date" value={formData.enrollment_date} onChange={(e) =>
              setFormData({ ...formData, enrollment_date: e.target.value })
            } />
             {errors.enrollment_date && <p className="error">{errors.enrollment_date[0]}</p>}
              </div>
              <div>
                <label htmlFor="">Selected status</label>
                <select  value={formData.status} onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }  defaultValue={formData.status} >        
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
               
             {errors.status && <p className="error">{errors.status[0]}</p>}
              </div>
             
              <button className="primary-btn">Actualizar</button>
              <div className="flex items-center justify-end gap-4">
              <Link
                to={'/'}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Back
              </Link>

              
            </div>
           </form>
        </>

    )
}