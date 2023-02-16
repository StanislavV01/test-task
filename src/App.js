import Input from './Components/Input/Input'
import RepositoryList from './Components/RepositoryList/RepositoryList';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { repositoriesLoading, repositoriesReceived, repositoriesRequestFailed } from './app/Slice/RepositorySlice';
import './App.css';
import Pagination from './Components/Pagination/Pagination';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { list, status, error } = useSelector(state => state.repositories);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        dispatch(repositoriesLoading());
        const response = await axios.get(`https://api.github.com/search/repositories?q=${searchTerm?searchTerm:'react'}&per_page=3&page=${page}`);
        dispatch(repositoriesReceived(response.data.items));
        setTotalPages(Math.ceil(response.data.total_count / 3));
      } catch (error) {
        dispatch(repositoriesRequestFailed(error.message));
      }
    };

    fetchRepositories();
  }, [searchTerm, page, dispatch]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePrevPageClick = () => {
    setPage(page => Math.max(page - 1, 1));
  };

  const handleNextPageClick = () => {
    setPage(page => Math.min(page + 1, totalPages));
  };


  return (
    <div className="App">
      <Input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      <RepositoryList list={list} status={status} error={error}></RepositoryList>

    <Pagination totalPages={8} page={page} handleNextPageClick={handleNextPageClick} handlePrevPageClick={handlePrevPageClick} setPage={setPage}/>
    </div>
   
        

  );
}

export default App;
