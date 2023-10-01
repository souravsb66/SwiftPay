
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from './Buttons'
import { QueryForm } from './forms/QueryForm'
// import { adminTransactionsData } from '../redux/admin/SupportReducer/action'
import { getAllTransactions } from '../redux/admin/transactionsReducer/action'


export const Transactions = () => {
  const [limit] = useState(6)
  const [currentPage, setCurrentPage] = useState(1);
  const [presentData , setPresentData] = useState(false)
  const [queryForm,setQueryForm] = useState("")

  const [sortOrder, setSortOrder] = useState('');
  const dispatch = useDispatch()
  
  const {allTransactions, loggedInUser} = useSelector((store)=>{
    return {
      allTransactions : store.transactionsReducer.allTransactions,
      loggedInUser: store.authReducer.loggedInUser
    }
  },shallowEqual)


  const filteredTransactions = allTransactions.filter((el)=>{
    if(loggedInUser.transactions.includes(el.id))
    return el;
  })

  const sortTransactions = (transactions) => {
    return transactions.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else if (sortOrder === 'desc') {
        return dateB - dateA;
      } else {
        return 0;
      }
    });
  };
  const sortedTransactions = sortTransactions(filteredTransactions);
  useEffect(()=>{
    dispatch(getAllTransactions())
  },[])

  const handleSortInAsc = () => {
    setSortOrder('asc');
  }
  const handleSortInDesc = () => {
    setSortOrder('desc');
  }

  const totalPages = Math.ceil(sortedTransactions.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  let currentTransactions = sortedTransactions.slice(startIndex, endIndex);

   const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const timestamp = Date.now(); 
  const currentDate = new Date(timestamp);
  
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  
const formatDate = (input) => {
  var inputDate = new Date(input);
  var options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};
var formattedDate = inputDate.toLocaleString("en-US", options);

var date = formattedDate.replace(/(\d{4})/, '$1');

return date
}

  const handleRaiseQuery = (id) => {
    let userPrefilledObj = {
      user : {
        id: loggedInUser.id,
        name: loggedInUser.name,
        email : loggedInUser.email
      },
      createdDate: formattedDate,
      status : "open",
      transactionId : id
    }
    setQueryForm(userPrefilledObj)
    setPresentData(prev => !prev)
  }

  return (
    presentData ? <QueryForm userTransactionData={queryForm}/> : 
    <TRANSACTIONS>
    <h2>Users Transactions</h2>
    <Button onClick={handleSortInAsc}>{"Latest"}</Button>
    <Button onClick={handleSortInDesc}>{"Oldest"}</Button>
    {
      currentTransactions?.map((item)=>{
        return <div className='user-transactions-data' key={item.id}>
          <p>Id: {item.id}</p>
          <p>From: {item.from}</p>
          <p>Payment: {`${Math.abs(+item.amount)}`}</p>
          <p>To: {item.to}</p>
          <p>Message: {item.message}</p>
          <p>
            Date: {formatDate(item.date)}
          </p>
          {
            presentData || <Button onClick={()=>handleRaiseQuery(item.id)}>{"Raise query"}</Button>
          }
        </div>
      })
    }
    {totalPages > 1 && (
<div className="pagination">
  {Array.from({ length: totalPages }).map((_, index) => (
    <Button
      key={index}
      onClick={() => handlePageClick(index + 1)}
      className={currentPage === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </Button>
  ))}
</div>
)}
  </TRANSACTIONS>
  )
}


const TRANSACTIONS = styled.main`
  color:var(--primary-white);
  .user-transactions-data{
    color: white;
    border: 2px solid white;
    text-align: left;
    margin-bottom: .8rem;
  }
`
