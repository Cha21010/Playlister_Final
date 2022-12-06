import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import SearchBanner from './SearchBanner';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import  Button  from '@mui/material/Button';
import { ListItem, Typography } from '@mui/material';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import Statusbar from './Statusbar';
import SongCard from './SongCard';
import YouTubePlaylister from './YouTubePlaylister';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let isStatusBar = "";
    if(store.currentList){
        isStatusBar = <Statusbar/>
    }
    let youtubeScreen = 
    <Grid>
        <YouTubePlaylister/>
    </Grid>
    
    let commentScreen = "";
    if(store.currentList){
        // commentScreen=<Typography>fuck</Typography>
        commentScreen = 
        <Box>
        <List 
            id="playlist-cards" 
            sx={{overflow: 'scroll', height: '100%', width: '100%', bgcolor: '#8000F00F'}}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         </List> 
         </Box>       
    }
    <Typography>xxx</Typography>
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let [screenState,setScreenState] = useState(youtubeScreen);
    function handleYoutube(){
        setScreenState(youtubeScreen);
    }
    function handleComment(){
        setScreenState(commentScreen);
    }

    
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            <ListItem sx={{borderRadius:"25px", p: "10px", bgcolor: '#b3e5fc', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", height:100,width: '98%', fontSize: '48pt' }}>
            <Button sx={{transform:"translate(500%, 10%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Button>
            </ListItem>
            </List>;
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
            {/* <Fab sx={{transform:"translate(-20%, 0%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab> */}
                Your Playlists
            </div>
            <SearchBanner/>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        background: '#b3e5fc',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        overflow:'scroll',
                        height:'100%'
                    }}
                >
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={5} 
                    component={Paper} 
                    elevation={10} square>
                        <Box component = "form" noValidate sx = {{mt:3}}>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Button required fullWidth variant="contained" onClick={handleYoutube}> youtube</Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button required fullWidth variant="contained" onClick = {handleComment}>Comment</Button>
                                </Grid>
                            </Grid>
                        </Box>
                        {screenState}
                        {modalJSX}
                </Grid>
            </Grid>
        </div>)
}
export default HomeScreen;