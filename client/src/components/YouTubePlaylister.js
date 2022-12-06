import React, { useContext, useEffect } from 'react'
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store/index.js'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import StopIcon from '@mui/icons-material/Stop';

export default function YouTubePlaylister() {
    const { store } = useContext(GlobalStoreContext);

    

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [
        "gQlMMD8auMs",
        "POe9SOEKotk",
        "PEM0Vs8jf1w"
    ];
    let t = null;
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;
    const playerOptions = {
        height: '360',
        width: '475',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    // THIS FUNCTION DECREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function decSong() {
        currentSong--;
        if (currentSong < 0) {
            currentSong = playlist.length - 1
        }
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        t = event.target
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }
    const playprior = () => {
        decSong();
        loadAndPlayCurrentSong(t);
    }
    const handleStop = () => {
        t.pauseVideo();
    }
    const handlePlay = () => {
        t.playVideo();
    }
    const handleNext = () => {
        incSong();
        loadAndPlayCurrentSong(t);
    }
    
    let name = "Playlist";
    if (store.CurrentList != null) {
        name = store.currentList.name
    }

    let title = "Title";
    if (store.currentSong != null) {
        title = store.currentSong.title
    };

    let artist = "Artist";
    if (store.currentSong != null) {
        artist = store.currentSong.artist
    };

    let songOnPlay = 
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography color="#1a237e" variant="h5" sx={{ color: "#1a237e" }} align='center'>Now Playing<br></br><br></br></Typography>
            <Typography color="#1a237e" variant="h5">
                Playlist: {name}
            </Typography>
            <Typography color="#1a237e" variant="h5">
                Title: {title}
            </Typography>
            <Typography  color="#1a237e" variant="h5">
                Artist: {artist}
            </Typography>
            <Typography  color="#1a237e" variant="h5">
                Song Number: {currentSong + 1}
            </Typography>
            <Box component = "form" noValidate sx = {{mt:3}}>
                <Grid container 
                    sx={{
                    background: '#b3e5fc',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow:'scroll',
                    height:'100%'
                    }}>
                     <Grid item xs={12} sm={3}>
                        <Button onClick={playprior} required fullWidth variant='text'><FastRewindIcon/></Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={handlePlay} required fullWidth variant='text'><PlayArrowIcon/></Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={handleStop} required fullWidth variant='text'>< StopIcon/></Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={handleNext} required fullWidth variant='text'><FastForwardIcon/></Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        
    return (
    <Box>
        <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />
        {songOnPlay}
    </Box>)
}