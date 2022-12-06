import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SortSharpIcon from '@mui/icons-material/SortSharp';
import { TextField } from '@mui/material';

export default function SearchBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';
    const SortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Name (A - Z)</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Publish Date (Newest)</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/guest/'>Listens (High - Low)</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/guest/'>Likes (High - Low)</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/guest/'>Dislikes (High - Low)</Link></MenuItem>
        </Menu>
    );
    return (
        <Box sx={{flexGrow: 1 }}>
            <AppBar   style={{ background: '#4fc3f7' }} position="sticky">
                <Toolbar>
                    <Typography                        
                        variant="h2"
                        noWrap
                        component="div"
                        sx={{ width: 0.03, display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link  style={{ textDecoration: 'none', color: 'black' }} to='/'><HomeOutlinedIcon/></Link>
                    </Typography>
                    <Typography                        
                        variant="h2"
                        noWrap
                        component="div"
                        sx={{ width: 0.03 , display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link  style={{ textDecoration: 'none', color: 'black' }} to='/'><Groups2OutlinedIcon/></Link>
                    </Typography>
                    <Typography                        
                        variant="h2"
                        noWrap
                        component="div"
                        sx={{ width: 0.03 ,display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link  style={{ textDecoration: 'none', color: 'black'} } to='/'><PermIdentityOutlinedIcon/></Link>
                    </Typography>
                    <TextField
                            sx={{ width: 0.45 ,ml:20}}  
                            margin="normal"
                            searchField 
                            inputProps={{style: {fontSize: 24}}}
                            InputLabelProps={{style: {fontSize: 24}}}
                            autoFocus
                    />
                    <Box sx={{ width: 0.1 ,ml:20 ,style: {fontSize:24}, color: 'black'}}>
                      SORT BY
                    </Box>

                    <Typography sx={{ height: "20px", display: { xs: 'none', md: 'flex' },color: 'black'}}>
                        <Link  onClick={handleSortMenuOpen} style={{ textDecoration: 'none', color: 'black' }} to='/'><SortSharpIcon/></Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            {SortMenu}
        </Box>
    );
}