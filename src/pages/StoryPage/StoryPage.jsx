import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Api from "../../Api";
import Comment from "../../components/comment.jsx";
import "./StoryPage.css";
import { unixToHumanTime } from "../../function";
import Loader from "../../components/Loader";

const StoryPage = ({ match }) => {
    const [api, setApi] = useState(new Api());
    const [story, setStory] = useState(null);
    const [updateReplies, setUpdateReplies] = useState(false);

    useEffect(() => {
        const id = match.params.id;
        api.getStoryByID(id)
            .then(res => res.json())
            .then(data => {
                setStory(data);
            });
    }, [api, match.params.id, updateReplies]);

    if (!story) {
        return <Loader />;
    }

    return (
        <div className="storyPageContainer">
            <button className="button">
                <Link to="/">Go back</Link>
            </button>
            <button className="button" onClick={() => { setUpdateReplies(!updateReplies) }}>
                Update replies
            </button>
            <h2 className="title">{story.title}</h2>
            <div className="author">Author: {story.by}</div>
            <div className="time">{unixToHumanTime(story.time)}</div>
            <div className="url">{story.url}</div>
            <div className="commentsCount">Replies: {story.descendants}</div>
            {story.kids &&
                story.kids.map(commentId => (
                    <div key={commentId}>
                        <Comment commentId={commentId} />
                    </div>
                ))}
        </div>
    );
};

export default withRouter(StoryPage);

