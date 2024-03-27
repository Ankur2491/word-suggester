import { Link } from 'react-router-dom';
import { useState } from 'react';
import App from './App';
import { AppBar, Divider, Toolbar } from '@mui/material';

export default function Navigation() {
    const [cat, setCat] = useState('word');
    return (
        <div>
        <AppBar position="sticky" style={{backgroundColor:'#1F1B24'}}>
            <Toolbar disableGutters>
          <Link style={{ color: '#F5F5F5', fontSize:'20px', textDecoration:'none' }} onClick={()=>setCat('new')}>Word Suggester</Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link style={{ color: cat === 'word'? 'grey': 'white', fontSize:'15px', textDecoration:'none', paddingTop:'5px', paddingLeft:'5px' }} onClick={()=>setCat('word')}>Word</Link>
          <Link style={{ color: cat === 'movie'? 'grey': 'white', fontSize:'15px', textDecoration:'none', paddingTop:'5px', paddingLeft:'5px' }} onClick={()=>setCat('movie')}>Movie</Link>
            </Toolbar>
        </AppBar>
        <App category={cat}/>
        </div>
    )
}