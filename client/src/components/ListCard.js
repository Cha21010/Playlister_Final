import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import WorkspaceScreen from './WorkspaceScreen';
import SongCard from './SongCard';
import { Grid } from '@mui/material';
import EditToolbar from './EditToolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const[extend,setExtend] = useState(false)

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
    }
            console.log(store.currentList)
        }
    
    

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function handleExtend(event){
        // store.setCurrentList(id);
        setExtend(true);
    }

    function handleClose(event){
        setExtend(false);
        store.closeCurrentList();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleLike(event){
        
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#b3e5fc', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
            button
            onClick={(event) => {
                if(store.currentList==null){
                handleLoadList(event, idNamePair._id);
                handleExtend();
                }
            }}
        >
            <Box>
                <Typography variant='h3'>{idNamePair.name}</Typography>
                <Box><Typography  sx={{ fontSize: 15 }}>likes:{idNamePair.likes}</Typography></Box>
                <Box><Typography  sx={{ fontSize: 15 }}>dislikes:{idNamePair.dislikes}</Typography></Box>
                <Box><Typography  sx={{ fontSize: 15 }}>listens:{idNamePair.listens}</Typography></Box>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    let workSpace = "";
    if(store.currentList != null){
        workSpace = store.currentList.songs.map((song, index) => (
            <SongCard
                id={'playlist-song-' + (index)}
                key={'playlist-song-' + (index)}
                index={index}
                song={song}
            />
        ))
        // workSpace = <Grid>
        //     <WorkspaceScreen/>
        //     </Grid>

    }
    let extendedCard = 
    <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{borderRadius:"25px", p: "10px", bgcolor: '#b3e5fc', marginTop: '15px', display: 'flex', p: 1 }}
        style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
        button>
    <Grid container>
    <Card elevation={3} style={{border: "none", boxShadow: "none",backgroundColor: "transparent"}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Box><Typography variant='h3'>{idNamePair.name}<br></br></Typography></Box>
                <Box sx={{ fontSize: 16 }}>likes:{idNamePair.likes}<Button onClick={handleLike}><ThumbUpOffAltIcon/></Button></Box>
                <Box sx={{ fontSize: 15 }}>dislikes:{idNamePair.dislikes}<Button><ThumbDownOffAltIcon/></Button></Box>
                <Box sx={{ fontSize: 15 }}>listens:{idNamePair.listens}</Box>
            </CardContent>
        </Box>
    </Card>
    <Grid item xs={20}>{workSpace}</Grid>
    <Grid item sx={{ p: 1 }}>
        <EditToolbar/>
        <Button 
        onClick={(event) => {handleDeleteList(event, idNamePair._id)}} aria-label='delete'>
        Delete
        </Button>
        <Button  aria-label='delete'>
        Duplicate
        </Button>
        <IconButton onClick={handleClose} aria-label='edit'><KeyboardDoubleArrowUpIcon style={{fontSize:'48pt'}} /></IconButton>
    </Grid>

    </Grid>
    
</ListItem>

    let card = "";
    if(extend){
        card = extendedCard
    }
    else{
        card = cardElement
    }

    return (
        card
    );
}


export default ListCard;