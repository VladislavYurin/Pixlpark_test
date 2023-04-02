import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./story.css";
import {unixToHumanTime} from "../function.js";

export default ({ storyInfo }) => {

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
