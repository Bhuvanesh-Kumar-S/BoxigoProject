import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const Boxigo = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [expandedInventory, setExpandedInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://test.api.boxigo.in/sample-data/")
      .then((response) => {
        setData(response.data.Customer_Estimate_Flow);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const toggleDetails = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const toggleInventoryDetails = (index) => {
    setExpandedInventory(expandedInventory === index ? null : index);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Boxigo Project</h1>
      {data.map((item, index) => (
        <div key={index} className="move-container">
          <div className="move-header">
            <div className="move-info">
              <h2>From: {item.moving_from}</h2>
              <h2>To: {item.moving_to}</h2>
            </div>
            <div className="move-info">
              <h2>{item.pro}</h2>
            </div>
            <button onClick={() => toggleDetails(index)} className="toggle-button">
              {expanded === index ? "Hide Move Details" : "View Move Details"}
            </button>
          </div>
          {expanded === index && (
            <div className="move-details">
              <ul className="inventory-list">
                {item.items.inventory.map((inventoryItem, i) => (
                  <li key={i} className={`inventory-item ${expandedInventory === i ? "expanded" : ""}`}>
                    <div onClick={() => toggleInventoryDetails(i)} className="inventory-header">
                      {inventoryItem.displayName}
                    </div>
                    {expandedInventory === i && (
                      <ul className="category-list">
                        {inventoryItem.category.map((categoryItem, j) => (
                          <li key={j} className="category-item">
                            {categoryItem.displayName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Boxigo;
