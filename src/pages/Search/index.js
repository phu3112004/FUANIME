import { useParams } from 'react-router-dom';
import SuggestVideo from '../../components/SuggestVideo';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search({ isDarkMode }) {
    const { query } = useParams();

    return (
        <div className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <SuggestVideo query={query} searchPage isDarkMode={isDarkMode} />
        </div>
    );
}

export default Search;
