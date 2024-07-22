import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';
import SuggestVideo from '../../components/SuggestVideo';

const cx = classNames.bind(styles);

function Video() {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);

    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.apikey.API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                setVideoDetail(data.items[0]);
            })
            .catch((error) => console.error('Error fetching video details:', error));
    }, [videoId]);

    const [buttonText, setButtonText] = useState('...Xem thêm');
    const [parentHeight, setParentHeight] = useState('100px');

    const handleMore = useCallback(() => {
        setButtonText((prevText) => (prevText === '...Xem thêm' ? 'Ẩn bớt' : '...Xem thêm'));
        setParentHeight((prevHeight) => (prevHeight === 'auto' ? '100px' : 'auto'));
    }, []);

    if (!videoDetail) return <div>Loading...</div>;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-area')}>
                <iframe
                    className={cx('video-iframe')}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <h1 className={cx('video-title')}>{videoDetail.snippet.title}</h1>
                <div style={{ height: parentHeight }} className={cx('video-description')}>
                    <p>
                        <b>Đăng vào lúc: </b>
                        {videoDetail.snippet.publishedAt.slice(0, 10)}
                    </p>
                    <b>Mô tả:</b>
                    <p>{videoDetail.snippet.description}</p>
                    <button onClick={handleMore} className={cx('more-btn')}>
                        {buttonText}
                    </button>
                </div>
            </div>
            <div className={cx('suggest-video-area')}>
                <SuggestVideo query={videoDetail.snippet.title.slice(0, 6)} fullWidth />
            </div>
        </div>
    );
}

export default Video;
