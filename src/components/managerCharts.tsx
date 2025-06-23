import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./charts.module.css";

export default function AdminChart() {
  const [lineData, setLineData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item, index) => ({
          month: ["Jan", "Feb", "Mar", "Apr"][index],
          earnings: 5000 + item.id * 1000,
        }));
        setLineData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching line data:", error);
        setLoading(false);
      });

    fetch("https://jsonplaceholder.typicode.com/users?_limit=4")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item, index) => ({
          week: `Week ${index + 1}`,
          users: 200 + item.id * 50,
        }));
        setAreaData(formattedData);
      })
      .catch((error) => console.error("Error fetching area data:", error));
  }, []);

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.chart}>
          <h2>Earnings Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={lineData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="earnings" stroke="#50c878" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chart}>
          <h2>Active Users</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={areaData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#9b59b6"
                fill="#9b59b6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
