import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from '../../assets/assets';
import "./UpdateFood.css";
import { toast } from "react-toastify";  // إضافة إشعارات

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [list,setList] = useState([]);
  const [data, setData] = useState({
    name: "",
    name_uk: "",
    price: "",
    gram: "",
    category: "",
    description: "",
    image: "", // تأكد من أن الصورة مهيأة مسبقًا
  });
  const url = import.meta.env.VITE_API_URL;
  const [image, setImage] = useState(null);
  const fetchList = async () =>{
    const response = await axios.get(`${url+"/api/cat/list-cat"}`);
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error");
    }
  }
  useEffect(() => {
    fetchList();
    axios.get(`${url+"/api/food/one-item/"+id}`)
      .then((res) => {
        setData(res.data);
        
      })
      .catch((err) => console.error(err));
      
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value =event.target.value;
    setData(data=>({...data,[name]:value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("name", data.name);
    formData.append("name_uk", data.name_uk);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("gram", data.gram);
    formData.append("category", data.category);

    if (image) {
        formData.append("image", image);
    }

    try {
        const response = await axios.put(
            `${url+"/api/food/update-item/"+id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } } // ✅ مهم جدًا
        );

        if (response.data.success) {
            alert("تم التحديث بنجاح!");
            navigate("/admin-dubai/list");
        } else {
            alert("حدث خطأ أثناء التحديث.");
        }
    } catch (err) {
        console.error("Update failed:", err);
    }
};

  return (
    <div>
      <h2>Update Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <p>size:205*300 px ,format:webp</p>
          <label htmlFor="image">
            <img
src={image ? URL.createObjectURL(image) : data.image ? data.image : assets.upload_area}
alt="Uploaded"
            />
          </label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden />
        </div>

        <input type="text" name="name" value={data.name } onChange={handleChange} required />
        <input type="text" name="name_uk" value={data.name_uk } onChange={handleChange} required />
        <input type="number" name="price" value={data.price } onChange={handleChange} required />
        <input type="text" name="gram" value={data.gram } onChange={handleChange} required />
        <textarea name="description" value={data.description } onChange={handleChange} rows="6" required></textarea>
        
        <select name="category" value={data.category } onChange={handleChange} required>
                    {list.map((item,index) =>{
                        return (
                    <option key={index} value={item.name}>{item.name}</option>
                        )
                })}

                    </select>
        


        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFood;
