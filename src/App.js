import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import wordList from './words';

function randomizeYear() {
  let year = [];
  for(let i=2000;i<=2024;i++) {
    year.push(i);
  }
  let random = Math.floor(Math.random()*year.length);
  return year[random];
}
// function randomizePage(totalPages) {
//   return Math.floor(Math.random()*totalPages);
// }

function randomizeResult(totalResult) {
  return Math.floor(Math.random()*totalResult);
}


function App(props) {
  async function generateAnotherMovie() {
    let year = randomizeYear();
    let initResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=98c3f8bd00e0a1138dccdc4dc8a7d1b9&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=${year}&with_original_language=hi`) 
    let initJson = await initResponse.json();
    let resultNum = randomizeResult(initJson['results'].length);
    setMovie(initJson['results'][resultNum]);
  }
  function generateAnotherWord() {
    let words = wordList;
    let idx = randomizeResult(words['allWords'].length);
    setMovie(null);
    setWord(words['allWords'][idx]); 
  }
  const[movie, setMovie] = useState(null);
  const[word, setWord] = useState(null);
  useEffect(() => {
    async function generateWord() {
      if(props.category === 'movie') {
        let year = randomizeYear();
        let initResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=98c3f8bd00e0a1138dccdc4dc8a7d1b9&language=hi-IN&region=IN&sort_by=popularity.desc&page=1&primary_release_year=${year}&with_original_language=hi`) 
        let initJson = await initResponse.json();
        // let page = randomizePage(initJson['total_pages']);
        // let pageResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=98c3f8bd00e0a1138dccdc4dc8a7d1b9&language=hi-IN&region=IN&sort_by=popularity.desc&page=${page}&primary_release_year=${year}&with_original_language=hi`)
        // let pageJson = await pageResponse.json();
        let resultNum = randomizeResult(initJson['results'].length);
        setWord(null);
        setMovie(initJson['results'][resultNum]);
      }
      else{
        let words = wordList;
        let idx = randomizeResult(words['allWords'].length);
        setMovie(null);
        setWord(words['allWords'][idx]); 
      }
    }
    generateWord();
  },[props.category]);
  return (
    <div className="App" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      {
        props.category === 'movie' && movie &&
        <div>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={movie['original_title']}
          subheader={movie['release_date']}
        />
        <CardMedia
          component="img"
          height="400"
          image={`https://image.tmdb.org/t/p/w500${movie['poster_path']}`}
          alt="no image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           {movie['original_title']}
          </Typography>
        </CardContent>
      </Card>
      <hr/>
      <Button variant="contained" onClick={generateAnotherMovie}>Suggest Another</Button>
      </div>
      }
      {
        props.category === 'word' && word &&
        <div>
          <h3>{word}</h3>
          <Button variant="contained" onClick={generateAnotherWord}>Suggest Another</Button>
        </div>
      }
    </div>
  );
}

export default App;
