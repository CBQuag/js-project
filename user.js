export default class User{
    constructor(name){
        this.name=name;
        this.moviesWatched=0;
        this.movieList=[];
        this.averageScore=0;
    }
    
    //Adds an Object to the User's movieList Array that itself contains a Movie object, 
    //a boolean value to determine if it's been watched, and a number that serves as a score.
    //Only movies that have been completed can have a score attached.
    addMovie(movie,watched,newScore){
        this.movieList.push({mov: movie, w: watched, s: newScore});
        this.movieList.w=watched;
        !newScore?null:watched?this.movieList.s=newScore:console.log('You must watch a movie before giving a rating.');
    }

    //Returns the index of a Movie Object in the User's movieList based on the title
    getIndex=movieName=>this.movieList.findIndex(x=>x.mov.name.toLowerCase()==movieName.toLowerCase());

    //Finds a Movie in the User's movieList, then removes it
    removeMovie=movie=>this.movieList.splice([this.getIndex(movie)],1);

    //First checks to see if a given movie has been completed, then updates the 's' property to update the score
    adjustScore=(movieName,newScore)=>this.getIndex(movieName)==-1?console.log('Movie not found.'):this.movieList[this.getIndex(movieName)].w==true?this.movieList[this.getIndex(movieName)].s=newScore:console.log('You must watch a movie before giving a rating.');

    //Updates the 'w' value in the corresponding Object with a given Movie Object to display as having been watched,
    //then optionally sends a passed score value through the ajustScore function to give it a score
    finishMovie(movie, newScore){
        this.movieList[this.getIndex(movie)].w=true;
        newScore?this.adjustScore(movie,newScore):null;
    }

    //Iterates down the User's movieList Array and logs the name, date and score of each completed movie
    displayMovieList(){
        console.log(`${this.name}'s Movie List:`);
        this.movieList.forEach(m=>m.w?console.log(`${m.mov.name} (${m.mov.date}) ${m.s?m.s:''}`):null);
        console.log();
    }

    //Takes the total of all runtimes and converts to hours and minutes
    displayWatchTime(){
        let total=0;
        this.movieList.forEach(m=>total+=m.mov.runtime);
        console.log('Watched a total of: '+Math.floor(total/60)+' Hours and '+total%60+' Minutes');
    }

}
