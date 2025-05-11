import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    const url="http://localhost:3000";
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <h2>Items</h2>
            <NavLink to="/admin-dubai/add" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink >
            <NavLink to="/admin-dubai/list" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to="/admin-dubai/orders" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <h2>Categores</h2>
            <NavLink to="/admin-dubai/add-cat" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Category</p>
            </NavLink >
            <NavLink to="/admin-dubai/list-cat" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Categores</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
