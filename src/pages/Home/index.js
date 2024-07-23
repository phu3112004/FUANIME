import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SuggestVideo from '../../components/SuggestVideo';

const cx = classNames.bind(styles);

function Home({ isDarkMode }) {
    const [type, setType] = useState('all');
    const btnRefs = useRef([]);

    const handleClickButton = (index) => {
        btnRefs.current.forEach((btn, i) => {
            if (btn) {
                btn.classList.toggle('button-click', i === index);
            }
        });
    };
    return (
        <div className={isDarkMode ? cx('wrapper-darkmode') : cx('wrapper')}>
            <div>
                <button
                    ref={(el) => (btnRefs.current[0] = el)}
                    className={cx('type-btn', { 'button-click': type === 'all' })}
                    onClick={() => {
                        setType('all');
                        handleClickButton(0);
                    }}
                >
                    All
                </button>
                <button
                    ref={(el) => (btnRefs.current[1] = el)}
                    className={cx('type-btn', { 'button-click': type === 'date' })}
                    onClick={() => {
                        setType('date');
                        handleClickButton(1);
                    }}
                >
                    Upload date
                </button>
                <button
                    ref={(el) => (btnRefs.current[2] = el)}
                    className={cx('type-btn', { 'button-click': type === 'rating' })}
                    onClick={() => {
                        setType('rating');
                        handleClickButton(2);
                    }}
                >
                    Rating
                </button>
            </div>
            <div className="video-list">
                <SuggestVideo type={type} isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}

export default Home;
