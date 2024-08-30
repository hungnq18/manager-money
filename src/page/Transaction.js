import AddBalance from '../component/AddFinanceButton';
import Balance from '../component/Balance';
import CategoryList from '../component/CategoryList';
import Footer from '../component/Footer';
import Header from '../component/Header';
import '../css/transaction.css';
function Transaction() {
  return (
    <div className="grid-container">
      <div className="header">
        <Header />
      </div>
      <div className="Main">
      <Balance />
      <CategoryList />
      <AddBalance /> 
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Transaction;
