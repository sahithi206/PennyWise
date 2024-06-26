import React, { useState, useRef, useMemo } from "react";
import { Select, Table, Radio } from 'antd';
import Button from "../Button/Index"; // Ensure this path is correct
import searchImg from "../assets/search.svg"; // Ensure this path is correct
import Papa from "papaparse";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
const { Option } = Select;

function Ttable({ transactions = [], addTransaction, fetchTransactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const fileInput = useRef();
  const [user] = useAuthState(auth);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `₹${text}`, // Ensure correct formatting
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        if (typeFilter && transaction.type !== typeFilter) {
          return false;
        }
        if (search && !transaction.name.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortKey === "date") {
          return new Date(a.date) - new Date(b.date);
        }
        if (sortKey === "amount") {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [transactions, search, typeFilter, sortKey]);

  async function importFromCsv(event) {
    event.preventDefault();
    try {
      Papa.parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(user, newTransaction, true);
          }
          toast.success("All Transactions Added");
          fetchTransactions();
        },
      });
      event.target.value = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  function exportToCSV() {
    const csv = Papa.unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div style={{ width: "95%", padding: "1rem 2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          height: "2rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchImg} style={{ width: "1.25rem", height: "1.25rem" }} alt="Search Icon" />
          <input
            value={search}
            placeholder="Search by Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
            marginLeft: "1rem",
          }}
        >
          <h2 style={{ marginRight: "2rem" }}>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <Button text="Export to CSV" onClick={exportToCSV} />
            <label htmlFor="file-csv" className="btn">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importFromCsv}
              ref={fileInput}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table columns={columns} dataSource={filteredTransactions} rowKey="id" />
      </div>
    </div>
  );
}

export default Ttable;
/*import React, { useState, useRef } from "react";
import { Select, Table, Radio } from 'antd';
import Button from "../Button/Index"; // Ensure this path is correct
import searchImg from "../assets/search.svg"; // Ensure this path is correct
import Papa from "papaparse";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
const { Option } = Select;

function Ttable({ transactions = [], addTransaction, fetchTransactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const fileInput = useRef();
  const [user]=useAuthState(auth);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => ₹${text}, // Ensure correct formatting
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  async function importFromCsv(event) {
    event.preventDefault();
    try {
      Papa.parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(user,newTransaction, true);
          }
          toast.success("All Transactions Added");
          fetchTransactions();
        },
      });
      event.target.value = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  function exportToCSV() {
    const csv = Papa.unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div style={{ width: "95%", padding: "1rem 2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          height: "2rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchImg} style={{ width: "1.25rem", height: "1.25rem" }} alt="Search Icon" />
          <input
            value={search}
            placeholder="Search by Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
            marginLeft: "1rem",
          }}
        >
          <h2 style={{ marginRight: "2rem" }}>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <Button text="Export to CSV" onClick={exportToCSV} />
            <label htmlFor="file-csv" className="btn">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importFromCsv}
              ref={fileInput}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table columns={columns} dataSource={sortedTransactions} rowKey="id" />
      </div>
    </div>
  );
}

export default Ttable;*/