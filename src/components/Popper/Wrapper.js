import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className, isDarkMode }) {
    return <div className={isDarkMode ? cx('wrapper-darkmode', className) : cx('wrapper', className)}>{children}</div>;
}
export default Wrapper;
