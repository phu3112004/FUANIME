import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import AuthContext from '../../../components/AuthContext';
import images from '../../../assest/images';
import Image from '../../../components/Image';
import config from '../../../config';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUser, faArrowRightFromBracket, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import Search from '../Header/Search';

const cx = classNames.bind(styles);

function Header({ isDarkMode, toggleDarkMode }) {
    const { currentUser, login, logout } = useContext(AuthContext);

    let darkModeIcon = faSun;
    isDarkMode ? (darkModeIcon = faMoon) : (darkModeIcon = faSun);

    return (
        <header className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo')}>
                <Image className={cx('logo-img')} src={isDarkMode ? images.logoWhite : images.logoBlack} />
            </Link>

            <Search isDarkMode={isDarkMode} />

            <div className={cx('actions')}>
                {!currentUser && (
                    <Button onClick={login} primary>
                        Log in with Google
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
                                    Theme mode: {isDarkMode ? 'Light' : 'Dark'}
                                </Button>
                                {currentUser && (
                                    <>
                                        <Button
                                            to={`/profile/${currentUser.sub}`}
                                            text
                                            isDarkMode={isDarkMode}
                                            leftIcon={<FontAwesomeIcon icon={faUser} />}
                                        >
                                            View profile
                                        </Button>
                                        <Button
                                            onClick={logout}
                                            text
                                            isDarkMode={isDarkMode}
                                            leftIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                                            state={{
                                                img: currentUser.picture,
                                                name: currentUser.name,
                                                email: currentUser.email,
                                            }}
                                        >
                                            Log out
                                        </Button>
                                    </>
                                )}
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('setting')}>
                        {currentUser ? (
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
