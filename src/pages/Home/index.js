import React, { useState, useRef } from 'react';
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
            <div className={cx('button-container')}>
                <button
                    ref={(el) => (btnRefs.current[0] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'all' })
                            : cx('type-btn', { 'button-click': type === 'all' })
                    }
                    onClick={() => {
                        setType('all');
                        handleClickButton(0);
                    }}
                >
                    All
                </button>
                <button
                    ref={(el) => (btnRefs.current[1] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'date' })
                            : cx('type-btn', { 'button-click': type === 'date' })
                    }
                    onClick={() => {
                        setType('date');
                        handleClickButton(1);
                    }}
                >
                    Upload date
                </button>
                <button
                    ref={(el) => (btnRefs.current[2] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'rating' })
                            : cx('type-btn', { 'button-click': type === 'rating' })
                    }
                    onClick={() => {
                        setType('rating');
                        handleClickButton(2);
                    }}
                >
                    Rating
                </button>
                <button
                    ref={(el) => (btnRefs.current[3] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'one piece' })
                            : cx('type-btn', { 'button-click': type === 'one piece' })
                    }
                    onClick={() => {
                        setType('one piece');
                        handleClickButton(3);
                    }}
                >
                    One Piece
                </button>
                <button
                    ref={(el) => (btnRefs.current[4] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'conan' })
                            : cx('type-btn', { 'button-click': type === 'conan' })
                    }
                    onClick={() => {
                        setType('conan');
                        handleClickButton(4);
                    }}
                >
                    Conan
                </button>
                <button
                    ref={(el) => (btnRefs.current[5] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'naruto' })
                            : cx('type-btn', { 'button-click': type === 'naruto' })
                    }
                    onClick={() => {
                        setType('naruto');
                        handleClickButton(5);
                    }}
                >
                    Naruto
                </button>
                <button
                    ref={(el) => (btnRefs.current[6] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'boruto' })
                            : cx('type-btn', { 'button-click': type === 'boruto' })
                    }
                    onClick={() => {
                        setType('boruto');
                        handleClickButton(6);
                    }}
                >
                    Boruto
                </button>
                <button
                    ref={(el) => (btnRefs.current[7] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'd gray' })
                            : cx('type-btn', { 'button-click': type === 'd gray' })
                    }
                    onClick={() => {
                        setType('d gray');
                        handleClickButton(7);
                    }}
                >
                    D.Gray-Man
                </button>
                <button
                    ref={(el) => (btnRefs.current[8] = el)}
                    className={
                        isDarkMode
                            ? cx('type-btn-darkmode', { 'button-click': type === 'dragon quest' })
                            : cx('type-btn', { 'button-click': type === 'dragon quest' })
                    }
                    onClick={() => {
                        setType('dragon quest');
                        handleClickButton(8);
                    }}
                >
                    Dragon Quest
                </button>
            </div>
            <div className="video-list">
                <SuggestVideo type={type} isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}

export default Home;
