import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import HI from "./HI";
import { BackgroundGradient } from "@/components/ui/background-gradient";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [autofillData, setAutofillData] = useState(null);
  const { user } = useSelector((state) => state.user);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("user_file", file);

    try {
      const response = await axios.post("http://localhost:3004/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAutofillData(response.data);
      localStorage.setItem("parsedData", JSON.stringify(response.data));
      console.log("Parsed Data:", response.data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            {user.avatar && user.avatar.url ? (
              <img
                src={user.avatar.url || "/placeholder.svg"}
                alt="User Avatar"
                className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                {user.fullName ? user.fullName[0].toUpperCase() : "U"}
              </div>
            )}
            <CardTitle className="text-3xl font-bold text-gray-800">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {user.fullName || "USER"}
              </span>
              !
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="resume"
                  className="w-full max-w-md py-4 px-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition duration-300 ease-in-out"
                >
                  <input
                    type="file"
                    id="resume"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {file ? file.name : "Upload your resume here"}
                    </p>
                  </div>
                </label>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                >
                  Submit Resume
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <HI autofillData={autofillData} />
      </div>
    </div>
  );
};

export default Dashboard;
