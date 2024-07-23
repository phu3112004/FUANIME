import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className, isDarkMode, arrow }) {
    return (
        <div className={isDarkMode ? cx('wrapper-darkmode', className) : cx('wrapper', className)}>
            {children}
            {arrow && <div className={isDarkMode ? cx('arrow-darkmode') : cx('arrow')}></div>}
        </div>
    );
}
export default Wrapper;
