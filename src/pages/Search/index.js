import { useParams } from 'react-router-dom';
import SuggestVideo from '../../components/SuggestVideo';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const { query } = useParams();

    return (
        <div className={cx('wrapper')}>
            <SuggestVideo query={query} />
        </div>
    );
}

export default Search;
