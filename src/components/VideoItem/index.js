import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';

const cx = classNames.bind(styles);

function VideoItem({ src, title, isDarkMode }) {
    let cutTitle = title;
    if (cutTitle.length > 60) {
        cutTitle = cutTitle.slice(0, 57) + '...';
    }
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={src} alt="thumbnails" />
            <h2 className={isDarkMode ? cx('title-darkmode') : cx('title')}>{cutTitle}</h2>
        </div>
    );
}

export default VideoItem;
