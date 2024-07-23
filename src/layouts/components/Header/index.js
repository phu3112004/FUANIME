import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import images from '../../../assest/images';
import Image from '../../../components/Image';
import config from '../../../config';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import Search from '../Header/Search';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import { useState, useEffect } from 'react';

const login = () => {
    window.location.href = config.apikey.GET_LINK_TOKEN;
};
const getToken = () => {
    const url = new URLSearchParams(window.location.hash.substring(1));
    const token = url.get('access_token');
    return token;
};
const getUserInfo = async () => {
    const access_token = getToken();
    const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await res.json();
    return data;
};

const cx = classNames.bind(styles);

function Header({ isDarkMode, toggleDarkMode }) {
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const token = getToken();
        if (token) {
            getUserInfo(token).then((data) => {
                setCurrentUser(data);
                setIsUserLogin(true);
            });
        }
    }, []);
    let darkModeIcon = faSun;
    isDarkMode ? (darkModeIcon = faMoon) : (darkModeIcon = faSun);
    return (
        <header className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo')}>
                <Image className={cx('logo-img')} src={isDarkMode ? images.logoWhite : images.logoBlack} />
            </Link>

            <Search isDarkMode={isDarkMode} />

            <div className={cx('actions')}>
                {!isUserLogin && (
                    <Button onClick={login} primary rightIcon={<FontAwesomeIcon icon={faGoogle} />}>
                        Log in with
                    </Button>
                )}
                <HeadlessTippy
                    interactive
                    placement="bottom-end"
                    duration={[200, 300]}
                    render={(attrs) => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            <PopperWrapper arrow isDarkMode={isDarkMode}>
                                <Button
                                    text
                                    leftIcon={<FontAwesomeIcon icon={darkModeIcon} />}
                                    onClick={toggleDarkMode}
                                    isDarkMode={isDarkMode}
                                >
                                    Giao diện: {isDarkMode ? 'Tối' : 'Sáng'}
                                </Button>
                                {isUserLogin && (
                                    <Button
                                        to={`/profile/${currentUser.email}`}
                                        text
                                        isDarkMode={isDarkMode}
                                        leftIcon={<FontAwesomeIcon icon={faUser} />}
                                        state={{
                                            img: currentUser.picture,
                                            name: currentUser.name,
                                            email: currentUser.email,
                                        }}
                                    >
                                        Xem hồ sơ
                                    </Button>
                                )}
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('setting')}>
                        {isUserLogin ? (
                            <span className={cx('setting-user')}>
                                <Image src={currentUser.picture} className={cx('setting-img')} />
                                <h4>{currentUser.name}</h4>
                            </span>
                        ) : (
                            <button className={cx('setting-icon', { darkmodeText: isDarkMode })}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </div>
                </HeadlessTippy>
            </div>
        </header>
    );
}

export default Header;
