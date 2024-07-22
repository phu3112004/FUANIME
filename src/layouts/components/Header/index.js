import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import images from '../../../assest/images';
import Image from '../../../components/Image';
import config from '../../../config';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Search from '../Header/Search';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo')}>
                <Image className={cx('logo-img')} src={images.logoBlack} />
            </Link>

            <Search />

            <Button primary rightIcon={<FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>}>
                Log in with
            </Button>
        </header>
    );
}

export default Header;
