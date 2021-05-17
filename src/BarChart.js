import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { sortData } from "./util";



const BarChart = () => {
  const [chartData, setChartData] = useState({});
  useEffect(()=>{
      let covidcountries =[];
      let covidcountriescases =[];
      let coviddate =[];
      //https://disease.sh/v3/covid-19/historical/{covidcountries}?lastdays=30
     axios.get("https://disease.sh/v3/covid-19/countries")
      .then(res =>{
        //console.log(res.data)
        const sortedData = sortData(res.data)
        //console.log(sortedData.country)

        for(const dataObj of sortedData){
          covidcountries.push(dataObj.country)
          covidcountriescases.push(parseInt(dataObj.cases))
        }
        
        setChartData({
          labels:covidcountries,
          datasets: [
            {
              labels:'test',
              data: covidcountriescases,
              backgroundColor:"#CC1034",
              borderColor: "#CC1034",
              indexAxis: 'y',
            }
          ],
                  })
                  })
      .catch(err =>{
        //console.log(err);
      });
  },[])
  
  return (
  <div>
    <Bar data={chartData}
     />
    
  </div>
  )
}

export default BarChart;