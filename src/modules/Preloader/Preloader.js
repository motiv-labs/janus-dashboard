import React from 'react';
import BubblePreloader from 'react-bubble-preloader';

import './Preloader.css';

const Preloader = () => (
    <BubblePreloader
        bubble={{ width: '2rem', height: '2rem' }}
        animation={{ speed: 2 }}
        className="j-preloader"
        colors={['#90c200', '#bde841', '#cee48f']}
    />
);

export default Preloader;
