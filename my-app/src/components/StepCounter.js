import "../css/StepCounter.css"; // 导入你的 CSS 文件
import People from "../images/people.gif";
import React, { useState } from "react";
import CircularContainer from "./CircularContainer"; // 导入 CircularContainer 组件

// Evidence
import { storage } from "../firebase.js"; // 引入storage
import { ref, uploadBytes } from "firebase/storage";

const StepCounter = ({ onStepChange }) => {
  const [steps, setSteps] = useState(""); // 用于跟踪用户输入的步数
  const [distance, setDistance] = useState(""); // 用于跟踪计算出的步行距离
  const [carbonSaved, setCarbonSaved] = useState(0); // 用于跟踪计算出的二氧化碳节省量
  const [file, setFile] = useState(null); // evidence
  // 处理输入框变化

  // Evidence Upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const fileRef = ref(storage, `evidence/${file.name}`);
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        alert("File uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      });
  };

  const handleChange = (e) => {
    setSteps(e.target.value); // 更新步数
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault(); // 防止表单默认行为
    onStepChange(steps); // 将步数传递给父组件处理
    // 计算步行距离（假设一步 = 0.8 米）
    const walkingDistance = parseFloat(steps) * 0.8; // 将步数转换为距离
    setDistance(walkingDistance.toFixed(2)); // 设置距离并保留两位小数
    // 计算二氧化碳节省量（假设 1 公里 = 0.27 公斤 CO2 节省）
    const carbonSavedValue = (walkingDistance / 1000) * 0.27; // 将米转换为公里并计算 CO2 节省量
    setCarbonSaved(carbonSavedValue.toFixed(2)); // 设置 CO2 节省量并保留两位小数
  };

  // 计算二氧化碳减少的百分比
  const percentageSaved = (carbonSaved / 1) * 100; // 假设 1 公斤 CO2 为 100%

  return (
    <div className="step-counter-container">
      <form onSubmit={handleSubmit}>
        <label>How many steps did you take today?</label>
        <input
          type="number"
          value={steps}
          onChange={handleChange}
          placeholder="Enter the steps"
          required
        />
        <button type="submit" className="btn btn-outline-success">
          Submit
        </button>

        {/* Evidence  */}

        <input type="file" onChange={handleFileChange} />
        <button
          type="button"
          onClick={handleFileUpload}
          className="btn btn-outline-secondary"
        >
          Upload Evidence
        </button>
      </form>

      {/* Always display the walking distance label, but only show the value after submit */}

      <div className="row info">
        <div className="col-md-6 ">
          <div className="walking-distance">
            <p>You have walked {distance ? `${distance} meters` : ""}</p>

            <img
              src={People}
              alt="Description of Image"
              className="side-image wow fadeInLeft"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="percentage-saved">
            <p>Percentage of 1 Kg of CO2 you saved</p>
            <CircularContainer percentageSaved={percentageSaved} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;
