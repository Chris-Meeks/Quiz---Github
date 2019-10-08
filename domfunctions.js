// JavaScript source code


function showQs(){
	removeElement("optionpage")
	//document.getElementById("questioncontainer").style.display="Block"
	//document.getElementById("next").style.display="Block"
	//document.getElementById("answers").style.display="Block"
	restoreElement("questioncontainer")
	restoreElement("next")
	restoreElement("answers")
	document.getElementById("scorekeeper").style.display="grid"
	//console.log("showQs was called")
}

function showOptions(){
	removeElement("questioncontainer")
	removeElement("next")
	removeElement("answers")
	document.getElementById("scorekeeper").style.display="none"
	restoreElement("optionpage")
}

function status(){
	console.log("Question: "+game.answered)
	console.log("Correct: "+game.correct)
	console.log("Round: "+game.round)

}

function showScores(){
	removeElement("questioncontainer")
	removeElement("next")
	removeElement("answers")
	document.getElementById("scorekeeper").style.display="none"
	restoreElement("scores")

}

function hideNextRound(){
	removeElement("scores")
}




function shuffleArray(array){
	
	var narray =[]
		do{


		let ind = Math.floor(Math.random()*array.length)
		narray.push(array[ind])
		array.splice(ind,1)
		
		}while(array.length>0)
		game.question['Incorrect'] = narray
		//console.log("INC  "+game.question['Incorrect'])
		//console.log("COR  "+game.question['Correct'])
	return [narray,game.question['Incorrect'].indexOf(game.question['Correct'])]
}

function removeElement(elemid){
	return document.getElementById(elemid).style.display = 'None'
}

function restoreElement(elementid){
	return document.getElementById(elementid).style.display = "grid"
}