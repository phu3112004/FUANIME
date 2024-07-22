import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '../../../../components/Popper';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import config from '../../../../config';
import { useDebounce } from '../../../../hooks';
import VideoItem from '../../../../components/VideoItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowhResult] = useState(true);
    const inputValueRef = useRef();
    const debounced = useDebounce(searchValue, 500);

    const handleChangeValue = (e) => {
        setSearchValue(e);
    };
    const handleClearValue = () => {
        setSearchValue('');
        inputValueRef.current.value = '';
        inputValueRef.current.focus();
    };

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${config.apikey.API_KEY}&channelId=${config.apikey.CHANNEL_ID}&part=snippet&type=video&q=${searchValue}&maxResults=5`,
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.items) setSearchResult(data.items);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [debounced]);

    return (
        <HeadlessTippy
            interactive
            visible={searchResult.length && showResult}
            placement="bottom"
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Suggests</h4>
                        <div className={cx('search-area')}>
                            {searchResult.map((result) => (
                                <Link to={`/video/${result.id.videoId}`} key={result.id.videoId}>
                                    <VideoItem
                                        key={result.id.videoId}
                                        src={result.snippet.thumbnails.medium.url}
                                        title={result.snippet.title}
                                    />
                                </Link>
                            ))}
                        </div>
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={() => {
                setShowhResult(false);
            }}
        >
            <div className={cx('wrapper')}>
                <input
                    ref={inputValueRef}
                    spellCheck="false"
                    className={cx('input')}
                    placeholder="Search videos..."
                    onChange={(e) => handleChangeValue(e.target.value)}
                    onFocus={() => setShowhResult(true)}
                />
                {searchValue !== '' && (
                    <button className={cx('clear-btn')} onClick={handleClearValue}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;