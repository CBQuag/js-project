import User from "./user.js";
import Movie from "./movie.js";
import Prompt from "@cloud-technology/cli-prompt"
let firstTime=true;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Movie Objects
const mina=new Movie('Minari',2020,'Lee Isaac Chung',115);
const paths=new Movie('Paths of Glory',1957,'Stanley Kubrick',88);
const kino=new Movie('The Emoji Movie', 2017,'Tony Leondis',86)
const andre=new Movie('Andrei Rublev',1973,'Andrei Tarkovsky',186);
const wild=new Movie('Wild at Heart',1990,'David Lynch',125);
const napo=new Movie('Napoleon',1927,'Abel Gance',330);

//Sets an Array of Movie Objects to take from. As movies get added, inputting them will be easier.
let moviesArray=[mina,paths,kino,andre,wild,napo];

//Sets up an Array for User Objects, which allows for dynamically switching between users
let users=[];

let prompt;
let userIndex=0;
let first=true;
do{
    if(first){
        console.log('Welcome To the Movie List Service!');
        prompt='add user';first=false;
    }else{
        prompt=await Prompt("Input Selection ('help' for options, 'exit' to quit): ");
    }
    console.log('');
    switch (prompt.toLowerCase()){

        //Takes input to make a new User Object with a given name, adds them to an array of users,
        //then sets that User as the current user with an index
        case 'add user':case 'u':
            let use=new User(await Prompt('Enter Name of User: '));
            users.push(use);
            userIndex=users.length-1;
            break;

        //Takes input and compares that to the name property inside the User objects of the User Array
        //If there's a match, the index is updated to the index where the names match up
        case 'switch':case 'sw':
            let switchName=await Prompt('Enter Name to Switch to User: ');
            if(users.findIndex(x=>x.name==switchName)!==-1){
                userIndex=users.findIndex(x=>x.name==switchName);
                console.log(`Switched to ${users[userIndex].name}'s Account.`);
            }else{console.log('No Such User.');}
            break;

        //First, this accepts a title, and if that title appears in the name property of a Movie object already in
        //an array of movies, it will take the data from there. Otherwise, it will prompt the user to add in additional
        //data to make a completely new Movie Object, then add that both to the general pool of movies, and invoke the 
        //addMovie function to add that information to an Object in an Array tied to the current User
        case 'add movie':case 'm':
            console.log("Add a Movie: ");
            let title=await Prompt('Title: ');
            let m;
            if(moviesArray.findIndex(i=>i.name.toLowerCase()==title.toLowerCase())!=-1){
                m=moviesArray[moviesArray.findIndex(i=>i.name.toLowerCase()==title.toLowerCase())]
            }else{
                m=new Movie(title,await Prompt('Date: '),await Prompt('Director: '),await Prompt('Runtime: '));
                moviesArray.push(m);
            }
            let watch=await Prompt('Watched? (y/n): ');
            let w=false;
            watch=='y'?w=true:null;
            let s=await Prompt('Score: ')
            users[userIndex].addMovie(m,w,s)
            break;
        
        //Takes the name of a movie and a new score and passes them to the finishMovie function to set watched to true and 
        //adjust the score
        case 'finish movie':case 'f':
            users[userIndex].finishMovie(await Prompt('Enter Name of Movie: ', await Prompt('Enter New Score: ')));
            break;
        
        //Takes the name of a movie and removes it from the User's list
        case 'remove movie':case 'r':
            users[userIndex].removeMovie(await Prompt('Enter Name of Movie: '));
            break;

        //Takes the name of a movie and a score and runs the adjustScore funtion on the corresponding movie index
        case 'score':case 'sc':
            users[userIndex].adjustScore(await Prompt('Enter Name of Movie: '),await Prompt('Enter Score: '))
            console.log('');
            break;
        
        //Invokes the displayMovieList function to show the list of movies tied to the current user
        case 'display':case 'd':
            users[userIndex].displayMovieList();
            break;

        case 'watch time':case 't':
            users[userIndex].displayWatchTime();
            break;

        //Displays a list of options for navigation
        case 'help':
            console.log(`
--NAVIGATION--
"add user" or "u"     will add a new user to the list of users and assign them as the current user
"switch" or "sw"      will assign the current user to a different user
"add movie" or "m"    will add a movie to the current user's movie list
"finish movie" or "f" will set a certain movie's watched status to true and optionally adjust the score
"remove movie" or "r" will remove a movie from the current user's list
"score or "sc"        will change a given movie's score
"display" or "d"      will display the current user's movie list
--Press Any Other Key To Exit--`)
            break;
        
        default:
            if(prompt.toLowerCase()!='exit'){
                if(firstTime){
                console.log("Improper Input. Type help for more options");
                firstTime=false;
                }else{
                  let insult=new Array("what do you want me to do with that, funny guy?",
                    "You having a good time over there? You enjoying yourself? Put in the right input.",
                    "Yeah, you can just type whatever you want there, can't you? That's so much fun, isn't it? Just throw caution to the wind and waste everyone's time instead of using this brilliant code properly.",
                    "sus",
                    "Bruh stop",
                    "Why would you even put that in? What would possess you to do something like that?",
                    "I'm sending that comment to the FBI",
                    "Are you having a stroke?",
                    "I don't get it. I just don't get why you're doing this");
                  console.log(insult[getRandomInt(insult.length)]);        
                }
            }
            break;
    }
    console.log('');
}while(prompt.toLowerCase()!='exit');
