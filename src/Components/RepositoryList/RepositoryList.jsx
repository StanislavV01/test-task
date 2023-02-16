
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import styles from './list.module.css'

function RepositoryList({ list, status }) {

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        return <ErrorMessage />
    }
    if (list.length === 0) {
        return <h3> No results...</h3>
    }
    return (

        <div className={styles.list}>
            {list.map(repository => (
                <RepositoryItem data={repository} key={repository.id} />
            ))}
        </div>

    )
}

export default RepositoryList;
