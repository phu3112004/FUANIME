import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useLocation } from 'react-router-dom';
import Image from '../../components/Image';

const cx = classNames.bind(styles);

function Profile({ isDarkMode }) {
    const location = useLocation();
    const { img, name, email } = location.state || {};
    return (
        <div className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <div className={cx('container')}>
                {img && <Image src={img} alt={name} className={cx('img')} />}
                <div className={cx('info')}>
                    {name && (
                        <p>
                            <b>Full name:</b> {name}
                        </p>
                    )}
                    {name && (
                        <p>
                            <b>Email address:</b> {email}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
