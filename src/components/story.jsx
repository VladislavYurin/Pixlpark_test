import React, { useState, useEffect, useContext } from "react";
import "./story.css";
import { Link } from "react-router-dom";

export default ({ storyInfo }) => {
    function unixToHumanTime(unixTime) {
        const date = new Date(unixTime * 1000);
        const humanTime = date.toLocaleString();
        return humanTime;
    }

    return <Link to={`/story/${storyInfo.id}`} className="cardsLink" style={{ textDecoration: 'none' }}>
        <div className="storyContainer" >
            <div className="scoreContainer">★ {storyInfo.score}</div>
            <div className="titleContainer">{storyInfo.title}</div>
            <div className="autorAndTimeContainer">
                <div className="autorContainer">{storyInfo.by}</div>
                <div className="timeContainer">{unixToHumanTime(storyInfo.time)}</div>
            </div>
        </div>
    </Link >
}
