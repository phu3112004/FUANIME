import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';
import SuggestVideo from '../../components/SuggestVideo';
import AuthContext from '../../components/AuthContext';
import Button from '../../components/Button';
import Image from '../../components/Image';

const cx = classNames.bind(styles);

function Video({ isDarkMode }) {
    const { currentUser } = useContext(AuthContext);

    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);

    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.apikey.API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                setVideoDetail(data.items[0]);
            })
            .catch((error) => console.error('Error fetching video details:', error));

        window.scrollTo(0, 0);
    }, [videoId]);

    const [buttonText, setButtonText] = useState('...Xem thêm');
    const [parentHeight, setParentHeight] = useState('100px');

    const handleMore = useCallback(() => {
        setButtonText((prevText) => (prevText === '...Xem thêm' ? 'Ẩn bớt' : '...Xem thêm'));
        setParentHeight((prevHeight) => (prevHeight === 'auto' ? '100px' : 'auto'));
    }, []);

    if (!videoDetail) return <div>Loading...</div>;
    return (
        <div className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <div className={cx('video-area')}>
                <iframe
                    title="video"
                    className={cx('video-iframe')}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <h1 className={cx('video-title')}>{videoDetail.snippet.title}</h1>
                <div
                    style={{ height: parentHeight }}
                    className={isDarkMode ? cx('video-description-darkmode') : cx('video-description')}
                >
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
                <div style={{ height: parentHeight }} className={cx('video-cmt')}>
                    <h2>1 comments</h2>
                    {currentUser ? (
                        <div className={cx('cmt-type')}>
                            <div className={cx('cmt-type-img')}>
                                <Image src={currentUser.picture} className={cx('cmt-img')} alt="avt" />
                            </div>
                            <div className={cx('cmt-type-form')}>
                                {/* Sau nay doi day thanh form, button type submit */}
                                <input
                                    placeholder="Add a comment..."
                                    className={isDarkMode ? cx('cmt-input-darkmode') : cx('cmt-input')}
                                />
                                <Button primary>Comment</Button>
                            </div>
                        </div>
                    ) : (
                        <b>Login to comment.</b>
                    )}
                    <ul>
                        <li className={cx('cmt-type')}>
                            <div className={cx('cmt-type-img')}>
                                <Image src="../../../public/favicon.png" className={cx('cmt-img')} alt="avt" />
                            </div>
                            <div className={cx('cmt-type-form-list')}>
                                <div className={cx('cmt-info')}>
                                    <h3>Fu Anime</h3>
                                    <p>2024/08/02</p>
                                </div>
                                <p>This anime is the best anime that I've ever seen.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('suggest-video-area')}>
                <SuggestVideo query={videoDetail.snippet.title.slice(0, 6)} fullWidth isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}

export default Video;
