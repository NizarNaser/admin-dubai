import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from '../../assets/assets';
import "./UpdateCat.css";
import { toast } from "react-toastify";  // إضافة إشعارات

const UpdateCat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    name_uk: "",
    addel: "",
    image: "", // تأكد من أن الصورة مهيأة مسبقًا
  });
  const url = import.meta.env.VITE_API_URL;
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`${url+"/api/cat/one-cat/"+id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("name_uk", data.name_uk);
    formData.append("addel", data.addel);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${url+"/api/cat/update-cat/"+id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // ✅ مهم جدًا
      );

      if (response.data.success) {
        alert("تم التحديث بنجاح!");
        navigate("/admin-dubai/list-cat");
      } else {
        alert("حدث خطأ أثناء التحديث.");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      <h2>Update Cat Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <p>size:300*300 px ,format:webp</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : data.image ? data.image : assets.upload_area}
              alt="Uploaded"
            />
          </label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden />
        </div>

        <input type="text" name="name" value={data.name} onChange={handleChange} required />
        <input type="text" name="name_uk" value={data.name_uk} onChange={handleChange} required />
        <select name="addel" value={data.addel} onChange={handleChange} required>
          <option value="BAR">BAR</option>
          <option value="KICHEN">KICHEN</option>


        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCat;
