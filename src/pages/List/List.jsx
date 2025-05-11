import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from 'react';
const List = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [list, setList] = useState([]);
    const { setLoading, loading } = useContext(StoreContext);
  const handleNavigate = (id) => {
    navigate(`/update-food/${id}`);
  };
  const { id } = useParams();

  const fetchList = async () => {
   
    const response = await axios.get(`${url + "/api/food/list"}`);
    
    if (response.data.success) {
      setList(response.data.data);

      setLoading(false);
    } else {
      toast.error("Error");
      setLoading(false);
    }
  }



  const removeFood = async (foodId) => {
    const response = await axios.post(`${url + "/api/food/remove"}`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error("Error");
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchList();

  }, [])
  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-formats title">
          <b>Image</b>
          <b>Name</b>
          <b>Name uk</b>
          <b>Category</b>
          <b>Price</b>
          <b>weight</b>
          <b>description</b>
          <b>delete</b>
          <b>update</b>
        </div>
        {loading ? <Loader /> : (
        list.map((item, index) => {
          return (
            <div key={index} className="list-table-formats">
              <p><img
                src={item.image}
                alt={item.name}

              /></p>
              <p>{item.name}</p>
              <p>{item.name_uk}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p>{item.gram}</p>
              <p>{item.description}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
              <p><button onClick={() => handleNavigate(item._id)}>Update</button></p>

            </div>
          )
        }))}
      </div>

    </div>
  )
}

export default List
