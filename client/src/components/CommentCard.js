import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment, index } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'comment-' + index + '-card'}
            className={cardClass}
        >
            {index + 1}.
            <a
                // id={'comment-' + index + '-link'}
                // className="song-link"
                // href={"https://www.youtube.com/watch?v=" + song.youTubeId}
            >
                {comment.comment} by {comment.name}
            </a>
        </div>
    )
}