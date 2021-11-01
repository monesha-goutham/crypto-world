import React, { useState } from "react";
import MaterialTable from "material-table";
import millify from "millify";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import "./CryptoTable.scss";
import { useFlexLayout } from "react-table";

const CryptoTable = ({ coinsData }) => {
  // set table constrains
  const columns = [
    { title: "Rank", field: "rank" },
    {
      title: "Coin Name",
      field: "name",
      align: "left",
      render: (rowData) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={rowData.icon}
            style={{ width: "20px", height: "20px", paddingRight: "15px" }}
          />
          {rowData.name}
        </div>
      ),
    },
    { title: "Price (USD)", field: "price" },
    {
      title: "Change",
      field: "change",
      align: "left",
      cellStyle: {
        // display: "flex",
        // justifyContent: "center",
      },
      render: (rowData) => (
        <div
          style={{ color: rowData.negativeChange ? "tomato" : "lightgreen" }}
          className="column-change"
        >
          <p style={{ paddingRight: "10px" }}>{rowData.change}</p>
          {rowData.negativeChange ? <CaretDownOutlined /> : <CaretUpOutlined />}
        </div>
      ),
    },
    { title: "Volume", field: "volume" },
    { title: "Market Cap", field: "marketCap" },
  ];
  const options = {
    showTitle: false,
    search: false,
    draggable: false,
    // paging: false,
    headerStyle: {
      color: "var(--secondary-blue)",
      fontWeight: "bold",
      //   fontSize: "20px",
      backgroundColor: "aliceblue",
      //   borderBottom: "20px solid white",
      //   marginBottom: "40px",
      //   //   borderRadius: "5px",
    },
    rowStyle: {
      borderBottom: "2px solid whitesmoke",
      //   backgroundColor: "whitesmoke",
      outline: "none",
      padding: "0px",
    },
  };

  //   parse the data
  const tableData = [];

  for (let i = 0; i < coinsData?.length; i++) {
    const columnData = {
      rank: coinsData[i].rank,
      name: coinsData[i].name,
      icon: coinsData[i].iconUrl,
      price: `${millify(Number(coinsData[i].price))}`,
      change: coinsData[i].change,
      negativeChange: coinsData[i].change < 0 ? true : false,
      volume: millify(coinsData[i].volume),
      marketCap: millify(coinsData[i].marketCap),
    };

    tableData.push(columnData);
  }

  console.log(tableData);

  return (
    <div className="crypto-table">
      <MaterialTable
        columns={columns}
        options={options}
        data={tableData}
        style={{
          border: "0px !important",
          //   height: "10px",
          //   color: "red",
          //   borderRadius: "99px",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default CryptoTable;
