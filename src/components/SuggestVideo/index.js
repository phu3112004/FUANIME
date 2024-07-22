import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SuggestVideo.module.scss';
import config from '../../config';

const cx = classNames.bind(styles);

function SuggestVideo({ query, type, fullWidth }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageToken, setPageToken] = useState(null);

    const fetchVideos = (loadMore = false) => {
        let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${config.apikey.CHANNEL_ID}&type=video&maxResults=6&key=${config.apikey.API_KEY}`;

        if (type === 'date') {
            apiUrl += `&order=date`;
        } else if (type === 'rating') {
            apiUrl += `&order=rating`;
        } else if (query) {
            apiUrl += `&q=${query}`;
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
    };

    useEffect(() => {
        fetchVideos();
    }, [type, query]);

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
                        <li key={video.id.videoId || video.id} className={cx('video-item', { fullWidth })}>
                            <Link to={`/video/${video.id.videoId || video.id}`}>
                                <img
                                    src={video.snippet.thumbnails.medium.url}
                                    alt={video.snippet.title}
                                    className={cx('thumbnail')}
                                />
                                <div className={cx('video-info')}>
                                    <h4 className={cx('title')}>{video.snippet.title}</h4>
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
