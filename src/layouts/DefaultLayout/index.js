import classNames from 'classnames/bind';
import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children, isDarkMode, toggleDarkMode }) {
    return (
        <div className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className={isDarkMode ? cx('container-darkmode') : cx('container')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
