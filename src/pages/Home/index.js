import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SuggestVideo from '../../components/SuggestVideo';

const cx = classNames.bind(styles);

function Home({ isDarkMode }) {
    const [type, setType] = useState('all');
    const btnRefs = useRef([]);

    const buttons = [
        { label: 'All', type: 'all' },
        { label: 'Upload date', type: 'date' },
        { label: 'Rating', type: 'rating' },
        { label: 'One Piece', type: 'one piece' },
        { label: 'Conan', type: 'conan' },
        { label: 'Naruto', type: 'naruto' },
        { label: 'Boruto', type: 'boruto' },
        { label: 'D.Gray-Man', type: 'd gray' },
        { label: 'Dragon Quest', type: 'dragon quest' },
    ];

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
                {buttons.map((button, index) => (
                    <button
                        key={button.type}
                        ref={(el) => (btnRefs.current[index] = el)}
                        className={
                            isDarkMode
                                ? cx('type-btn-darkmode', { 'button-click': type === button.type })
                                : cx('type-btn', { 'button-click': type === button.type })
                        }
                        onClick={() => {
                            setType(button.type);
                            handleClickButton(index);
                        }}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
            <div className="video-list">
                <SuggestVideo type={type} isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}

export default Home;
