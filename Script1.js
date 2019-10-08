// JavaScript source code


class Game{
	constructor(token){
		this.token = '433ea9e8671f77a1c74292518fb318034af1a0020784a044343ad574fc371ec5'
		this.round = 0
		this.difficulty = ["&difficulty=easy","&difficulty=medium","&difficulty=hard"]
		this.answered = 0
		this.correct = 0
		this.question = {}
		this.questionids = ["answer0","answer1","answer2","answer3"]
		this.correctindex;
		this.clickedAnswer = this.clickedAnswer.bind(this)
		this.currentanswer;
		this.scorecard = ["score1","score2","score3","score4","score5","score6","score7","score8","score9","score10"]
		this.scorecardcolor = this.scorecardcolor.bind(this)
	}

	resetRound(){
		this.answered = 0;
		this.correct = 0;
		this.scorecard.forEach(answer=>{document.getElementById(answer).style.background= "#C9ADA1"})
			
	}
	resetGame(){
		this.round=0
	}
	
	scorecardcolor(answer){
	if(answer=="Correct"){
		document.getElementById(this.scorecard[this.answered]).style.background="green"
	}else{document.getElementById(this.scorecard[this.answered]).style.background="red"}
	}
	
	
	answerListener(){
		document.getElementById("answers").addEventListener("click",this.clickedAnswer,false)
	}
	another(){
		//this is to stop double submission of answers
		document.getElementById("answers").removeEventListener("click",this.clickedAnswer,false)
	}
	clickedAnswer(e){
		this.another()
		if(e.target!==e.currentTarget){
			var clickedItem = e.target.id
			//console.log("Clicked "+clickedItem)
			if(this.questionids.indexOf(clickedItem)==this.correctindex){
				console.log("Correct");
				this.scorecardcolor("Correct")
				this.correct++
			}else{console.log("Wrong!")
			this.scorecardcolor("Wrong!")}
			game.answered++
			this.currentanswer = document.getElementById(clickedItem).innerHTML
			
	}}

}

var game = new Game()
//game.answerListener()

///in here getToken to set token
/// if token retrieved then call getQuestion

function getToken(){

			var url = 'https://opentdb.com/api_token.php?command=request'
			function get(url) {
  
			  return new Promise(function(resolve, reject) {
    
				var req = new XMLHttpRequest();
				req.open('GET', url);
	

				req.onload = function() {
     
				  if (req.status == 200) {
        
					resolve(req.response);
				  }
				  else {
        
					reject(Error(req.statusText));
				  }
				};

    
				req.onerror = function() {
				  reject(Error("Network Error"));
				  
				}

    
				req.send();
			  });
			}

			 get(url).then(function(response) {
			  return JSON.parse(response);
  
			}).then(function(response){console.log(response['response_code'])
										game.token=response['token']
										console.log(response['token'])
										}).then(function(){getQuestion(opts.codes)})
			, function(error) {
			  console.error("Failed!", error);
			  console.log("Sorry, we cannot get your data right now")
			}
}


function getQuestion(codes){
			game.currentanswer = null;
			var url = 'https://opentdb.com/api.php?amount=1&type=multiple&token='
			function get(url) {
			//const codes = ["32","24","11"]
			const cat = codes[Math.floor(Math.random()*codes.length)]
			//console.log("code chosen"+cat)
			url = url+game.token+"&category="+cat+game.difficulty[game.round]
			  return new Promise(function(resolve, reject) {
    
				var req = new XMLHttpRequest();
				req.open('GET', url);
	

				req.onload = function() {
     
				  if (req.status == 200) {
        
					resolve(req.response);
				  }
				  else {
        
					reject(Error(req.statusText));
				  }
				};

    
				req.onerror = function() {
				  reject(Error("Network Error"));
				  console.log("It failed")
				}

    
				req.send();
			  });
			}

			 get(url).then(function(response) {
			  return JSON.parse(response);
  
			}).then(function(response){parseResponse(response)
							
										}).then(function(){game.answerListener()}).then(function(){showQs()})
			, function(error) {
			  console.error("Failed!", error);
			  console.log("Sorry, we cannot get your data right now")
			}
}

function parseResponse(response){
	if(response['response_code']==0){
		//console.log("That went well: "+response['response_code'])
		//console.log(response['results'])
		game.question = {'Question':response['results'][0]['question'],'Correct':response['results'][0]['correct_answer'],'Incorrect':response['results'][0]['incorrect_answers']}
		game.question['Incorrect'] = (game.question['Incorrect']).concat(game.question['Correct'])
		const [order,correctind] = shuffleArray(game.question['Incorrect'])
		game.correctindex = correctind
		//console.log("Correct index "+correctind)
		//console.log("From the class: "+game.correctindex)
		displayQuestion()
		
		
		
	}else{getToken()}
	}

function displayQuestion(){
	document.getElementById("question1").innerHTML=game.question['Question']
	for(let i = 0; i<game.questionids.length;i++){document.getElementById(game.questionids[i]).innerHTML=game.question['Incorrect'][i]}

}



function nextQ(){
	document.getElementById("next").addEventListener("click",finishRoundTest,false)
}

function finishRoundTest(){
	status()
	////here is our logical test.
	if(game.answered==10){
		game.round++;
		removeElement("next")
		
		betweenRounds()
		setTimeout(game.resetRound(),2000)
		
		opts.optionsReset()
	}else{
		if(game.currentanswer){getQuestion(opts.codes)}
	}
}


function betweenRounds(){
	if(!passed()){
		failCase()
	}else if(passed() && game.round!==3){
		passRound()
	}
	else if(passed() && game.round==3){
		winGame()
	}
	
	

	showScores()

	
}

function passed(){
	if(game.correct>=7){
		return true
	}else{
		return false
	}
}

function failCase(){
	document.getElementById("scoretext").innerHTML="Sorry. You only scored "+game.correct+"/10"
	document.getElementById("nextround").innerHTML="Start Over"
	game.resetGame()
	game.resetRound()
}

function passRound(){
	document.getElementById("scoretext").innerHTML="Good job. You scored "+game.correct+"/10"
	document.getElementById("nextround").innerHTML="Next Round"
	game.resetRound()

}

function winGame(){
	document.getElementById("scoretext").innerHTML="Well done. You've won!"
	document.getElementById("nextround").innerHTML="Start Over"
	game.resetGame()
	game.resetRound()
}




