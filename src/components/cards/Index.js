import React from "react";
import "./style.css";
import Button from "../Button/Index";
import { Card, Row } from "antd";

function Cards({ 
  income,
  expense,
  totalBalance,
  showExpenseModal, 
  showIncomeModal 
  }) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance" style={{fontSize:"0.9rem"}}>
          <p>₹{totalBalance}</p>
          <Button text="Reset Balance" green={true}  />
        </Card>
        <Card className="my-card" title="Total Income">
          <p>₹{income}</p>
          <Button text="Add Income" green={true} onClick={showIncomeModal} />
        
        </Card>
        <Card className="my-card" title="Total Expenses">
          <p>₹{expense}</p>
          <Button text="Add Expense" green={true} onClick={showExpenseModal} />
         
        </Card>
      </Row>
    </div>
  );
}
export default Cards;