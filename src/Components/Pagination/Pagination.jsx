import  styles from './pagination.module.css'
function Pagination({ page, totalPages, handleNextPageClick,handlePrevPageClick,setPage }) {
 
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className={styles.container}>
            <button onClick={handlePrevPageClick} disabled={page === 1} className={styles.button}>Previous</button>
           
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => setPage(number)} className={`${page === number ?styles.button+" "+styles.active:styles.button}`} >{number}</button>
                ))}
          
            <button onClick={handleNextPageClick} disabled={page === totalPages} className={styles.button}>Next</button>
        </div>
    );
  }
  
  export default Pagination;