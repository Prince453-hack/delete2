"use client";
import React, { useState, useEffect } from "react";
import { Table } from "antd";

interface Attendance {
  punchTime: string;
  punchLocation: string;
}

interface Employee {
  name: string;
  employeeSystemId: string;
  phoneNumber: string;
  category: string;
  attendances: Attendance;
}

interface AmbulanceData {
  ambulanceNumber: string;
  sysServiceId: string;
  date: string;
  currentEmt: Employee;
  currentDriver: Employee;
}

const page = () => {
  const [data, setData] = useState<AmbulanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await fetch("/api/ambulance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Ambulance Number",
      dataIndex: "ambulanceNumber",
      key: "ambulanceNumber",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "EMT Name",
      dataIndex: ["currentEmt", "name"],
      key: "emtName",
    },
    {
      title: "EMT ID",
      dataIndex: ["currentEmt", "employeeSystemId"],
      key: "emtId",
    },
    {
      title: "EMT Phone",
      dataIndex: ["currentEmt", "phoneNumber"],
      key: "emtPhone",
    },
    {
      title: "EMT Punch Time",
      dataIndex: ["currentEmt", "attendances", "punchTime"],
      key: "emtPunchTime",
    },
    {
      title: "Driver Name",
      dataIndex: ["currentDriver", "name"],
      key: "driverName",
    },
    {
      title: "Driver ID",
      dataIndex: ["currentDriver", "employeeSystemId"],
      key: "driverId",
    },
    {
      title: "Driver Phone",
      dataIndex: ["currentDriver", "phoneNumber"],
      key: "driverPhone",
    },
    {
      title: "Driver Punch Time",
      dataIndex: ["currentDriver", "attendances", "punchTime"],
      key: "driverPunchTime",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ambulance Employee Data</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="ambulanceNumber"
        scroll={{ x: 1200 }}
        className="border rounded-md border-gray-300"
      />
    </div>
  );
};

export default page;
