import React, { useEffect, useState } from 'react'
import "./AddCat.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate ,useParams} from "react-router-dom";

const AddCat = () => {
    const url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const[image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        name_uk:"",
        addel:""
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
            formData.append("addel",data.addel)
            formData.append("image",image)
            const response = await axios.post(`${url+"/api/cat/add-cat"}`,formData);
            if(response.data.success){
                setData({
                    name:"",
                    name_uk:"",
                    addel:""
                })
                setImage(false)
                toast.success(response.data.message)
                navigate(`/admin-dubai/list-cat`)

            }else{
                toast.error(response.data.message)
            }

    }
    useEffect(()=>{
       console.log(data)
    },[data])
  return (
    <div className='add'>
        <form  className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <p>size:300*300 px ,format:webp</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>category name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required/>
            </div>
            <div className="add-product-name flex-col">
                <p>category name_uk</p>
                <input onChange={onChangeHandler} value={data.name_uk} name="name_uk"  placeholder='name_uk' />
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Addel</p>
                    <select onChange={onChangeHandler} name="addel" required>
                    <option value=""></option>
                    <option value="BAR">BAR</option>
                    <option value="KICHEN">KICHEN</option>
 
                    </select>

                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default AddCat
