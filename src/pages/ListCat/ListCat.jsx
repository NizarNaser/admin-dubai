import React, { useEffect, useState } from 'react'
import "./ListCat.css"
import axios from  "axios"
import { toast } from 'react-toastify';
import { useNavigate ,useParams} from "react-router-dom";
const ListCat = () => {
  const url="https://backend-repo-v73c.onrender.com";
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/update-cat/${id}`);
  };
  const [list,setList] = useState([]);
const { id } = useParams();
  const fetchList = async () =>{
    const response = await axios.get(`${url+"/api/cat/list-cat"}`);
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error");
    }
  }

  const removeCat = async(catId)=>{
      const response = await axios.post(`${url+"/api/cat/remove-cat"}`,{id:catId});
      await fetchList();
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error("Error");
      }
  }
  useEffect(() =>{
   fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>All Categores list</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>name_uk</b>
            <b>Addel</b>
            <b>Action</b>
        </div>
        {list.map((item,index) =>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${url+"/images/"+item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.name_uk}</p>
              <p>{item.addel}</p>
              <p onClick={()=>removeCat(item._id)} className='cursor'>X</p>
              <p><button onClick={() => handleNavigate(item._id)}>Update</button></p>

            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default ListCat
