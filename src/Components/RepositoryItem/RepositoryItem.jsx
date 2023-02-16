import styles from './item.module.css'
import img from '../../assets/images/CourseImage.svg'
import star from '../../assets/images/Vector.svg'
import person from '../../assets/images/Level Icon.svg'



function RepositoryItem({data}) {
  return (
  
  <div className={styles.item}>
    <div  className={styles.left}>
    <div className={styles.image}>
        { data.owner.avatar_url ? <img src={data.owner.avatar_url} alt="owner" /> : <img src={img} alt="owner" />}
    </div>
    <div className={styles.about}>
        <a href={data.owner.html_url}><h3>{data.name}</h3> </a>
        <div>
            <p>{data.owner.login}</p>
            <p>{data.language}</p>
        </div>
        <div className={styles.descText}>
            <p>
             {data.description ? `${data.description.slice(0, 110)}...` : 'There is no description for this acount'}
            </p>
        </div>
    </div>
    </div>
    <div className={styles.right}>
        <div className={styles.rightItem}>
            <img src={star} alt="star" />
            <div className={styles.boldText}> {data.stargazers_count}  </div>
            <span> stars</span>
        </div>
        <div className={styles.rightItem}>
            <img src={person} alt="person" />
            <div className={styles.boldText}> {data.watchers_count}  watchers</div>
        </div>
    </div>
  </div>);
}

export default RepositoryItem;
