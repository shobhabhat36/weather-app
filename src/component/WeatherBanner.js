import React from 'react';

const WeatherBanner = () => {
    let url = '';
    return (
        <>
            <div id="temperature">77</div>
            <div id="temperature-mode">
                <span>&deg;</span>
                <a href={url}>C</a>
                <span>|</span>
                <a href={url}>F</a>
            </div>
        </>
    );
};

export default WeatherBanner;