import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SuggestVideo.module.scss';
import config from '../../config';

const cx = classNames.bind(styles);

function SuggestVideo({ query, type, fullWidth, searchPage, isDarkMode }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageToken, setPageToken] = useState(null);

    const fetchVideos = useCallback(
        (loadMore = false) => {
            let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=long&maxResults=6&channelId=${config.apikey.CHANNEL_ID}&key=${config.apikey.API_KEY}`;
            if (type === 'date') {
                apiUrl += `&order=date`;
            } else if (type === 'rating') {
                apiUrl += `&order=rating`;
            } else if (query) {
                apiUrl += `&q=${query}`;
            } else if (type && !query) {
                apiUrl += `&q=${type}`;
            }

            if (loadMore && pageToken) {
                apiUrl += `&pageToken=${pageToken}`;
            }

            setLoading(true);
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    if (data.items) {
                        setVideos((prevVideos) => (loadMore ? [...prevVideos, ...data.items] : data.items));
                        setPageToken(data.nextPageToken);
                    } else {
                        setVideos([]);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching videos:', error);
                    setLoading(false);
                });
        },
        [query, type, pageToken],
    );

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    if (loading && videos.length === 0) return <div>Loading suggest video...</div>;

    let title = 'All Videos';
    if (query) title = 'Related Videos';
    else if (type === 'date') title = 'Recent Videos';
    else if (type === 'rating') title = 'Popular Videos';
    return (
        <div className={cx('suggested-videos')}>
            <h3>{title}</h3>
            {videos.length > 0 ? (
                <ul className={cx('video-list')}>
                    {videos.map((video) => (
                        <li
                            key={video.id.videoId || video.id}
                            className={
                                isDarkMode ? cx('video-item-darkmode', { fullWidth }) : cx('video-item', { fullWidth })
                            }
                        >
                            <Link to={`/video/${video.id.videoId || video.id}`}>
                                <img
                                    src={video.snippet.thumbnails.medium.url}
                                    alt={video.snippet.title}
                                    className={cx('thumbnail')}
                                />
                                <div className={isDarkMode ? cx('video-info-darkmode') : cx('video-info')}>
                                    <h4 className={cx('title')}>{video.snippet.title}</h4>
                                    {searchPage && <p className={cx('des')}>{video.snippet.description}</p>}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No videos found.</div>
            )}
            {pageToken && (
                <button onClick={() => fetchVideos(true)} className={cx('loadmore-btn')}>
                    Load More
                </button>
            )}
        </div>
    );
}

export default SuggestVideo;
