import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './PoolChart.css'
import { useEffect, useState } from 'react';
const axios = require('axios').default;


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.color = "#fff";
ChartJS.defaults.backgroundColor = "#fff";
ChartJS.defaults.borderColor = "#fff";

export default function PoolChart(props) {
  const {poolId} = props
  const [rawData, setRawData] = useState([])
  const [chartData, setChartData] = useState({options:null, data:null})
  
  useEffect(()=>{
    axios.get("https://raw.githubusercontent.com/IncioMan/osmosis-pools-dashboard/master/data/delta_cumsum.json")
        .then(function (response) {
          console.log(response.data)
          setRawData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
  },[])

  useEffect(()=>{
    if(rawData.length == 0){
      return
    }

    const dates = Object.keys(rawData[poolId])

    const data = {
      labels: dates,
      datasets: [{
          label: 'For',
          data:
          dates.map((d)=>
          {
            let datapoint = {}
            datapoint.x = d
            datapoint.y = rawData[poolId][d]
            datapoint.poolId = poolId
            return datapoint
          }),
          fill: false,
          borderColor: '#fbc02c',
          tension: 0.1
        }
      ],
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
        title: {
          display: false,
          text: 'Chart.js Line Chart',
        },
      },
      elements: {
        point:{
          borderWidth: 0,
          radius: 0
        }
      },
      scales: {
        x: {
          stacked: true,
          grid:{
            display: false
          },
          title: {
            display: false,
          }
        },
        y: {
          grid:{
            display: false
          },
          title: {
            display: true,
            text: 'Total gamma tokens since 1st of February 2022'
          }
        },
      },
    };
    
    const cd = {
      options: options,
      data: data
    }
    setChartData(cd)
  },[rawData,poolId])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  }
    return (
      <div className='chart-container'>
      <div style={{ width: "100%", minWidth: "250px"}}>
        { (chartData.data)&&
          <Line options={chartData.options} data={chartData.data} />
        }
      </div>
    </div>
)}