import React, { useState, useEffect,useCallback } from "react";
import Index from "../components/Header/Index";
import Cards from "../components/cards/Index";
import AddExpenseModal from "../components/Modals/AddExpense";
import AddIncomeModal from "../components/Modals/AddIncome";
import moment from "moment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Ttable from "../components/Transactions/index";
import Charts from "../components/charts/charts";
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(user, newTransaction, false);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
  };

  async function addTransaction(user, transaction, many) {
    if (user) {
      if (transaction.amount === 0) {
        toast.error("Transaction amount cannot be zero");
        return;
      }
      try {
        const docRef = await addDoc(
          collection(db, `users/${user.uid}/transactions`),
          transaction
        );
        console.log("Document written with ID: ", docRef.id);
        if (!many) toast.success("Transaction Added!!");
        setTransactions((prevTransactions) => [...prevTransactions, transaction]);
      } catch (e) {
        console.error("Error adding Document:", e);
      }
    } else {
      toast.error("No User");
    }
  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      if (isNaN(amount)) {
        console.error(`Invalid transaction amount: ${transaction.amount}`);
        return;
      }

      if (transaction.type === "income") {
        incomeTotal += amount;
      } else if (transaction.type === "expense") {
        expenseTotal += amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  };

  useEffect(() => {
    if (transactions.length > 0) {
      calculateBalance();
    }
  }, [transactions]);

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      console.log("Fetched Transactions:", transactionsArray); // Logging the fetched transactions
      setTransactions(transactionsArray);
    }
    setLoading(false);
  }
  let sortedTransactions = transactions.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    
  });
  return (
    <div>
      <Index />
      <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      {transactions && transactions.length !== 0 ? <Charts sortedTransactions={sortedTransactions} /> : <></>}
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <Ttable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions} />
    </div>
  );
}
     
     