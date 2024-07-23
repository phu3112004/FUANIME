import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile({ isDarkMode }) {
    const location = useLocation();
    const { img, name, email } = location.state || {};
    console.log({ img, name, email });
    return (
        <div className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <div className={cx('container')}>
                {img && <img src={img} alt={name} className={cx('img')} />}
                <div className={cx('info')}>
                    {name && (
                        <p>
                            <b>Họ và tên:</b> {name}
                        </p>
                    )}
                    {name && (
                        <p>
                            <b>Địa chỉ email:</b> {email}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
