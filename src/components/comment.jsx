import React, { useState, useEffect } from "react";
import Api from "../Api";
import "./comment.css";

const Comment = ({ commentId, margin = 0 }) => {
    const [comment, setComment] = useState();
    const [api, setApi] = useState(new Api());
    const [openNestedComments, setOpenNestedComments] = useState(false);

    useEffect(() => {
        api.getStoryByID(commentId)
            .then(res => res.json())
            .then(data => {
                setComment(data);
            });
    }, []);

    function unixToHumanTime(unixTime) {
        const date = new Date(unixTime * 1000);
        const humanTime = date.toLocaleString();
        return humanTime;
    }
    return (
        <>
            {comment && <div className="comment" style={{ marginLeft: `${margin}px` }} onClick={() => { setOpenNestedComments(!openNestedComments) }} >
                <div>{comment.by}</div>
                <div>{unixToHumanTime(comment.time)}</div>
                <div className="text" dangerouslySetInnerHTML={{ __html: comment.text }} />
                {comment.kids ? <div className="nestedCommentsCount">Replies: {comment.kids.length}</div> : <div className="nestedCommentsCount">Replies: 0</div>}
            </div >}
            {
                comment && openNestedComments && comment.kids &&
                comment.kids.map(commentId => (
                    <div key={commentId}>
                        <Comment commentId={commentId} margin={margin + 40} />
                    </div>
                ))
            }
        </>)
};

export default Comment;
