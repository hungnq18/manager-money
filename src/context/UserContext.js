import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Tạo Context cho người dùng
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [monthlyBalances, setMonthlyBalances] = useState([]);
    const [users, setUsers] = useState([]);
    // Hàm để thêm giao dịch mới
    useEffect(() => {
        
    }, []);
    const getUsers = () => {
        axios
            .get(`http://localhost:9999/users`)
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    };
    const addTransaction = (userId, newTransaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
        axios.post(`http://localhost:9999/transactions`, { ...newTransaction, userId })
          .then(response => setTransactions([...transactions, response.data]))
          alert('Transaction added successfully!')
          .catch(error => console.error(error));
    };

    // Hàm để xóa giao dịch dựa trên id
    const deleteTransaction = (id) => {
        setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id));
        axios.delete(`http://localhost:9999/transactions/${id}`)
        .then(() => setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id)))
        .then(() => alert('Transaction deleted successfully!'))
        .catch(error => console.error(error));
    };

    // Hàm để lấy các giao dịch của một người dùng cụ thể từ API
    const getTransactions = (userId) => {
        axios
            .get(`http://localhost:9999/transactions?userId=${userId}`)
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    // get transaction by id
    const getTransactionById = (transactionId) => {
        axios
          .get(`http://localhost:9999/transactions/${transactionId}`)
          .then((response) => {
            setTransactions(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    }
    //Hàm edit transaction 
    const editTransaction = (transactionId, updatedTransaction) => {
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === transactionId ? { ...transaction, ...updatedTransaction } : transaction
          )
        );
        axios
          .put(`http://localhost:9999/transactions/${transactionId}`, updatedTransaction)
          .then((response) => {
            setTransactions((prevTransactions) =>
              prevTransactions.map((transaction) =>
                transaction.id === transactionId ? { ...transaction, ...response.data } : transaction
              )
            );
          })
          .then(() => alert('Transaction updated successfully!'))
          .catch((error) => {
            console.error(error);
          });
      };

    // Hàm để thêm category mới
    const addCategory = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        axios.post(`http://localhost:9999/categories`, newCategory)
          .then(response => setCategories([...categories, response.data]))
          .catch(error => console.error(error));
    };

    // Hàm để xóa category dựa trên id
    const deleteCategory = (id) => {
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        axios.delete(`http://localhost:9999/categories/${id}`)
        .then(() => setCategories(prevCategories => prevCategories.filter(category => category.id !== id)))
        .catch(error => console.error(error));
    };

    // Hàm để lấy các categories từ API
    const getCategories = (userId) => {
        axios
            .get(`http://localhost:9999/categories/?userId=${userId}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Hàm để thêm monthly balance mới
    const addMonthlyBalance = (userId, newBalance) => {
        setMonthlyBalances((prevBalances) => [...prevBalances, newBalance]);
        axios.post(`http://localhost:9999/monthlyBalance/?userId=${userId}`, { ...newBalance, userId })
          .then(response => setMonthlyBalances([...monthlyBalances, response.data]))
          .catch(error => console.error(error));
    };

    // Hàm để xóa monthly balance dựa trên id
    const deleteMonthlyBalance = (id) => {
        setMonthlyBalances((prevBalances) => prevBalances.filter((balance) => balance.id !== id));
        axios.delete(`http://localhost:9999/monthlyBalance/${id}`)
        .then(() => setMonthlyBalances(prevBalances => prevBalances.filter(balance => balance.id !== id)))
        .catch(error => console.error(error));
    };

    // Hàm để lấy các monthly balances của một người dùng cụ thể từ API
    const getMonthlyBalances = (userId) => {
        axios
            .get(`http://localhost:9999/monthlyBalance/?userId=${userId}`)
            .then((response) => {
                setMonthlyBalances(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <UserContext.Provider
            value={{
                transactions,
                addTransaction,
                deleteTransaction,
                getTransactions,
                getTransactionById,
                editTransaction,
                categories,
                addCategory,
                deleteCategory,
                getCategories,
                monthlyBalances,
                addMonthlyBalance,
                deleteMonthlyBalance,
                getMonthlyBalances,
                users,
                getUsers
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
