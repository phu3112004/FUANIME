import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SuggestVideo from '../../components/SuggestVideo';

const cx = classNames.bind(styles);

function Home() {
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
        <div className={cx('wrapper')}>
            <div>
                <button
                    ref={(el) => (btnRefs.current[0] = el)}
                    className={cx('type-btn', { 'button-click': type === 'all' })}
                    onClick={() => {
                        setType('all');
                        handleClickButton(0);
                    }}
                >
                    Tất cả
                </button>
                <button
                    ref={(el) => (btnRefs.current[1] = el)}
                    className={cx('type-btn', { 'button-click': type === 'date' })}
                    onClick={() => {
                        setType('date');
                        handleClickButton(1);
                    }}
                >
                    Gần đây
                </button>
                <button
                    ref={(el) => (btnRefs.current[2] = el)}
                    className={cx('type-btn', { 'button-click': type === 'rating' })}
                    onClick={() => {
                        setType('rating');
                        handleClickButton(2);
                    }}
                >
                    Được yêu thích
                </button>
            </div>
            <div className="video-list">
                <SuggestVideo type={type} />
            </div>
        </div>
    );
}

export default Home;
