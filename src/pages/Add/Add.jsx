import React, { useEffect, useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Add = () => {
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;
    const [list,setList] = useState([]);
    const fetchList = async () =>{
      const response = await axios.get(`${url+"/api/cat/list-cat"}`);
      if(response.data.success){
        setList(response.data.data);
      }else{
        toast.error("Error");
      }
    }
    const[image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        name_uk:"",
        description:"",

        price: "",
        gram:"",
        category:"SALAD"
    })



    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value =event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    

    const onSubmitHandler = async (event) =>{
            event.preventDefault();
            const formData = new FormData();
            formData.append("name",data.name)
            formData.append("name_uk",data.name_uk)
            formData.append("description",data.description)
            formData.append("price",Number(data.price))
            formData.append("gram",data.gram)
            formData.append("category",data.category)
            formData.append("image",image)
            try {
            const response = await axios.post(`${url+"/api/food/add"}`,formData);
            if(response.data.success){
                setData({
                    name:"",
                    name_uk:"",
                    description:"",
            
                    price: "",
                    gram:"",
                    category:""
                })
                setImage(false)
                toast.success(response.data.message)
                navigate(`/admin-dubai/list`)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error adding food:", error);
            toast.error("An error occurred while adding the food. Please try again.");
        }
     };
    useEffect(()=>{
        
       fetchList();
    },[data])
  return (
    <div className='add'>
        <form  className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <p>size:205*300 px ,format:webp</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product name en</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-name flex-col">
                <p>Product name uk</p>
                <input onChange={onChangeHandler} value={data.name_uk} type="text" name='name_uk' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write contnt here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" >
                    {list.map((item,index) =>{
                        return (
                    <option key={index} value={item.name}>{item.name}</option>
                        )
                })}


          
                    </select>

                </div>
                <div className="add-price flex-col">
                   <p>Product price</p>
                   <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                </div>
                <div className="add-the-weight flex-col">
                   <p>Product the weight</p>
                   <input onChange={onChangeHandler} value={data.gram} type="text" name='gram' placeholder='500' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add
