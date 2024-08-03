import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '../../components/Image';
import AuthContext from '../../components/AuthContext/AuthContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Profile({ isDarkMode }) {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <div className={cx('container')}>
                <Image src={currentUser.picture} alt={currentUser.name} className={cx('img')} />
                <div className={cx('info')}>
                    <p>
                        <b>Full name:</b> {currentUser.name}
                    </p>

                    <p>
                        <b>Email address:</b> {currentUser.email}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
