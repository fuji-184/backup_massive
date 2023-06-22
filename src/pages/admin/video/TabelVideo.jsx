import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Table from '../../../utilities/Table';
import Button from '../../../utilities/Button';
import PageTitle from '../../../utilities/PageTitle'
import AddButton from "../../../utilities/AddButton";

const TabelVideo = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/video", {
          method: "GET",
        });
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  const columns = ["judul", "deskripsi", "link"];

  const handleViewLink = (id) => `/view/${id}`;
  const handleEditLink = (id) => `/dashboard/video/edit/${id}`;

  const handleDelete = async (id) => {
  console.log(`Delete item with ID: ${id}`);
  try {
    const response = await fetch(`http://localhost:3000/video/${id}`, {
      method: "DELETE",
    });
    
    console.log("Item deleted successfully");
    fetchData();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};


  return (
    <div>
    <PageTitle title="Manage Video" />
      <div className="flex justify-between py-3">
        <Link to="/dashboard/video/add">
          <AddButton/>
        </Link>
        <div className="flex items-center justify-center">
          <div className="relative">
            <input type="text" placeholder="Search Content" className="pl-10 pr-4 py-2 rounded-lg border border-slate border-opacity-50  focus:border-transparent" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        
        <Table
          columns={columns}
          data={data}
          onViewLink={handleViewLink}
          onEditLink={handleEditLink}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default TabelVideo;
