import React from "react";
import { Line, Pie } from '@ant-design/charts';

function Charts({ sortedTransactions = [] }) {
  // Prepare data for the Line chart
  const lineChartData = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  // Prepare data for the Pie chart
  let pieChartData = sortedTransactions.filter((transaction) => {
      if(transaction.type === "expense"){
      return{tag: transaction.tag,
      amount: transaction.amount};
    }
  });
  let finalSpendings = pieChartData.reduce((acc,obj) => {
    let key=obj.tag;
    if(!acc[key]){
      acc[key]={tag:obj.tag,amount:obj.amount};
    } else{
      acc[key].amount +=obj.amount;
    }
    return acc;
  },{});
  // Configuration for the Line chart
  const lineConfig = {
    data: lineChartData,
    width: 730,
    autoFit: true,
    xField: "date",
    yField: "amount",
   
  };

  // Configuration for the Pie chart
  const pieConfig = {
    data: Object.values(finalSpendings),
    width: 400,
    angleField: "amount",
    colorField: "tag",
  };
 let pieChart;
  return (
    <div className="container">
      <div className="charts-wrapper">
        <h2 style={{ marginLeft: "1.5rem" }}>Your Analytics</h2>
        <Line {...lineConfig} />
      </div>
      {pieChartData ?
      (<div className="PieChart">
        <h2 style={{paddingTop:"0.05rem"}}>Your Spendings</h2>
        <Pie {...pieConfig} onReady={(chartInstance) => (pieChart = chartInstance)}/>
      </div>)
      :
       <></>
      }

    </div>
  );
}

export default Charts;