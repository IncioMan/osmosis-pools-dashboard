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
  const {proposalId} = props
  const [rawData, setRawData] = useState([])
  const [chartData, setChartData] = useState({options:null, data:null})
  
  useEffect(()=>{
    axios.get("https://raw.githubusercontent.com/IncioMan/osmosis-pools-dashboard/master/data/delta_cumsum.csv")
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

    const data = {
      labels: [...new Set(rawData.filter((d)=>d.proposal_id==proposalId).map((i, p)=> p))],
      datasets: [{
          label: 'For',
          data:
          rawData.filter((d)=>d.proposal_id==proposalId).sort((a, b) => a.hr.localeCompare(b.hr)).map((d)=>
          {
            let datapoint = {}
            datapoint.x = (0.1 - 0.2*Math.random()) + d.proposal_id
            datapoint.y = (Math.random())*1000 + Math.round(d.voting_power/1000000/100)*100
            datapoint.voter = d.voter
            datapoint.proposal_id = d.proposal_id
            return d.voting_power_for_cumsum
          }),
          fill: false,
          borderColor: '#7fe6a2',
          tension: 0.1
        },
        {
          label: 'Against',
          data:
          rawData.filter((d)=>d.proposal_id==proposalId)
                 .sort((a, b) => a.hr.localeCompare(b.hr))
                 .map((d)=>
          {
            let datapoint = {}
            datapoint.x = (0.1 - 0.2*Math.random()) + d.proposal_id
            datapoint.y = (Math.random())*1000 + Math.round(d.voting_power/1000000/100)*100
            datapoint.voter = d.voter
            datapoint.proposal_id = d.proposal_id
            return d.voting_power_against_cumsum
          }),
          fill: false,
          borderColor: '#ef5176',
          tension: 0.01
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
            display: true,
            text: 'Number of hours since the start'
          }
        },
        y: {
          grid:{
            display: false
          },
          title: {
            display: true,
            text: 'Amount of Voting Power'
          }
        },
      },
    };
    
    const cd = {
      options: options,
      data: data
    }
    setChartData(cd)
  },[rawData,proposalId])

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