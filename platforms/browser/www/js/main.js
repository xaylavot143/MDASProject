window.addEventListener("load",function() {


var Q = window.Q = Quintus({development:true})
        .include("Sprites, Scenes, Audio, Input, 2D, Anim, Touch, UI")
        .setup({width:600,height:800,scaleToFit:true})
        .touch()
        .enableSound();
Q.UI.Button.extend("Choice",{
	init:function(p){
		this._super(p,{
			x:0,
			y:0,
			label:'',
			color:'red',
			font:"100 20px arial",
			fontColor:'black'
		});
	},

});
var widthQ = Q.width/2;
var heightQ = Q.height/2;
var op ='';
var operation;
var level = '';
var cnt = 0;
Q.scene('main',function(stage){
	Q.audio.stop();
	 Q.audio.play('bgmusic.mp3');
	 addSprite(stage,widthQ,heightQ,'mdas.png');
	 addButton(stage,295,505,'playbtn.png',function(){
	 	// Q.audio.stop('bgmusic.mp3');
	 	Q.audio.play('click.mp3');
		Q.load('stagebg.png,beginnerbtn.png,advancebtn.png,geniusbtn.png',function(){
			Q.stageScene('stages');
		});
	 });
	 addButton(stage,300,605,'tutorialsbtn.png',function(){
	 	Q.audio.stop();
	 	Q.audio.play('click.mp3');
		Q.load('tutorials/subtractbg.png,tutorials/5cake.png,tutorials/5xcake.png,tutorials/addbg.png,tutorials/1cake.png,tutorials/2cake.png,tutorials/squares.png,tutorials/multiplybg.png,tutorials/divisionbg.png,tutorials/3cake.png,tutorials/1rcake.png,addition.mp3,subtraction.mp3,multiplication.mp3,division.mp3',function(){
			Q.stageScene('addtutorial');
		});
	 });
});
var score = 0;
var life = 3;
Q.scene('stages',function(stage){
	cnt = 0;
	addSprite(stage,widthQ,heightQ,'stagebg.png');
	addButton(stage,60,70,'backbtn.png',function(){
		Q.stageScene('main');
	});
	addButton(stage,305,450,'beginnerbtn.png',function(){
		Q.audio.stop();
		Q.audio.play('click.mp3');
		Q.load('backbtn.png,quiz/addbg.png,quiz/subtractbg.png,cupcake/box1.png,cupcake/box2.png,cupcake/box3.png,cupcake/box4.png,cupcake/box5.png,cupcake/box6.png,cupcake/box7.png,cupcake/box8.png,cupcake/box9.png,tutorials/squares.png',function(){
			Q.stageScene('beginner');
		});
	});
	addButton(stage,305,530,'advancebtn.png',function(){
		Q.audio.stop();
		Q.audio.play('click.mp3');
		Q.load('backbtn.png,quiz/addbg.png,quiz/subtractbg.png,quiz/multiplybg.png,cupcake/box1.png,cupcake/box2.png,cupcake/box3.png,cupcake/box4.png,cupcake/box5.png,cupcake/box6.png,cupcake/box7.png,cupcake/box8.png,cupcake/box9.png,tutorials/squares.png',function(){
			Q.stageScene('advance');
		});
	});
	addButton(stage,305,610,'geniusbtn.png',function(){
		Q.audio.stop();
		Q.load('backbtn.png,quiz/addbg.png,quiz/subtractbg.png,quiz/multiplybg.png,quiz/divisionbg.png,quiz/square.png,cupcake/box1.png,cupcake/box2.png,cupcake/box3.png,cupcake/box4.png,cupcake/box5.png,cupcake/box6.png,cupcake/box7.png,cupcake/box8.png,cupcake/box9.png,tutorials/squares.png',function(){
			Q.stageScene('genius');
		});
	});
});

//STAGES
Q.scene('beginner',function(stage){
	
	level = 'beginner';	
	cnt++;
	addButton(stage,60,70,'backbtn.png',function(){
		Q.stageScene('main');
	});
	Q.audio.play('bg2.mp3',{loop:1});

	if(cnt<=5 && life>0){
		operation = getOperation(level);
		console.log(operation);
		if(operation == 0){
			addSprite(stage,widthQ,heightQ,'quiz/addbg.png');
		}
		else{
			addSprite(stage,widthQ,heightQ,'quiz/subtractbg.png');
		}
		generateGiven(stage,operation,level);
	}else{
		if(life == 0){
			score = 0;
			life = 3;
		}
		Q.stageScene('main');
	}
	stage.insert(new Q.UI.Text({x:120,y:500,label:'Score: ' + score,font:"500 85px arial"}));

	generateLife(stage);
});

Q.scene('advance',function(stage){
	level = 'advance';
	cnt++;
	addButton(stage,60,70,'backbtn.png',function(){
		Q.stageScene('main');
	});
	Q.audio.play('bg2.mp3',{loop:1});
	if(cnt<=10){
		operation = getOperation(level);
		console.log(operation);
		if(operation == 0){
			addSprite(stage,widthQ,heightQ,'quiz/addbg.png');
		}
		else if(operation == 1){
			addSprite(stage,widthQ,heightQ,'quiz/subtractbg.png');
		}
		else if(operation == 2){
			addSprite(stage,widthQ,heightQ,'quiz/multiplybg.png');
		}
		generateGiven(stage,operation,level);
	}else{
		Q.stageScene('main');
	}
	stage.insert(new Q.UI.Text({x:120,y:500,label:'Score: ' + score,font:"500 85px arial"}));
});

Q.scene('genius',function(stage){
	level = 'genius';
	cnt++;
	addButton(stage,60,70,'backbtn.png',function(){
		Q.stageScene('main');
	});
	addSprite(stage,widthQ,heightQ,'quiz/divisionbg.png');
	generateGiven(stage,3,level);
	stage.insert(new Q.UI.Text({x:120,y:500,label:'Score: ' + score,font:"500 85px arial"}));
});

//END OF STAGES
//TUTORIALS

Q.scene('addtutorial',function(stage){
	op = 'add';
	var firstBtn,secondBtn;
	Q.audio.stop();
	Q.audio.play('addition.mp3');
	addSprite(stage,widthQ,heightQ,'tutorials/addbg.png');
	firstBtn = new Q.UI.Button({
		asset:'tutorials/1cake.png',
		x:180,
		y:370,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || secondBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && secondBtn.p.opacity == 1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,2,3,4,5,op);
				// countDown();
			}
		}
	});
	secondBtn = new Q.UI.Button({
		asset:'tutorials/2cake.png',
		x:420,
		y:380,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || firstBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && firstBtn.p.opacity == 1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,2,3,4,5,op);
				// countDown();
			}
		}	
	});
	stage.insert(firstBtn);
	stage.insert(secondBtn);
	
	addButton(stage,60,70,'backbtn.png',function(){
		Q.stageScene('main');
	});
});

Q.scene('subtracttutorial',function(stage){
	op = 'subtract';
	Q.audio.stop();
	Q.audio.play('subtraction.mp3');
	addSprite(stage,widthQ,heightQ,'tutorials/subtractbg.png');
	addButton(stage,60,70,'backbtn.png',function(){
		Q.stageScene('main');
	});
	var fivecake = new Q.UI.Button({
		asset:'tutorials/5cake.png',
		x:305,
		y:380
	},function(){
		this.p.asset = 'tutorials/5xcake.png';
		addSprite(stage,305,670,'tutorials/squares.png');
		generateChoices(stage,2,3,4,5,op);
	});
	stage.insert(fivecake);
});

Q.scene('multiplytutorial',function(stage){
	op = 'multiply';
	Q.audio.stop();
	Q.audio.play('multiplication.mp3');
	addSprite(stage,widthQ,heightQ,'tutorials/multiplybg.png');
	addButton(stage,60,70,'backbtn.png',function(){
		Q.stageScene('main');
	});
	var firstBtn,secondBtn,thirdBtn;
	firstBtn =  new Q.UI.Button({
		asset:'tutorials/2cake.png',
		x:140,
		y:370,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || secondBtn.p.opacity == 0 || thirdBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && secondBtn.p.opacity == 1 && thirdBtn.p.opacity == 1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,8,6,4,9,op);
				// countDown();
			}
		}
	});
	secondBtn =  new Q.UI.Button({
		asset:'tutorials/2cake.png',
		x:297,
		y:370,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || secondBtn.p.opacity == 0 || thirdBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && secondBtn.p.opacity == 1 && thirdBtn.p.opacity == 1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,8,6,4,9,op);
				// countDown();
			}
		}
	});
	thirdBtn =  new Q.UI.Button({
		asset:'tutorials/2cake.png',
		x:455,
		y:370,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || secondBtn.p.opacity == 0 || thirdBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && secondBtn.p.opacity == 1 && thirdBtn.p.opacity == 1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,8,6,4,9,op);
				// countDown();
			}
		}
	});
	stage.insert(firstBtn);
	stage.insert(secondBtn);
	stage.insert(thirdBtn);
});

Q.scene('divisiontutorial',function(stage){
	op = 'division';
	Q.audio.stop();
	Q.audio.play('division.mp3');
	addSprite(stage,widthQ,heightQ,'tutorials/divisionbg.png');
	addButton(stage,60,70,'backbtn.png',function(){
		Q.stageScene('main');
	});
	var firstBtn,secondBtn,thirdBtn,fourthBtn;
	firstBtn =  new Q.UI.Button({
		asset:'tutorials/3cake.png',
		x:90,
		y:370,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || secondBtn.p.opacity == 0 || thirdBtn.p.opacity == 0 || fourthBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && secondBtn.p.opacity == 1 && thirdBtn.p.opacity == 1 && fourthBtn.p.opacity ==1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,4,3.1,1.9,2,op);
				// countDown();
			}
		}
	});
	secondBtn =  new Q.UI.Button({
		asset:'tutorials/3cake.png',
		x:230,
		y:370,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || secondBtn.p.opacity == 0 || thirdBtn.p.opacity == 0 || fourthBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && secondBtn.p.opacity == 1 && thirdBtn.p.opacity == 1 && fourthBtn.p.opacity ==1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,4,3.1,1.9,2,op);
				// countDown();
			}
		}
	});
	thirdBtn =  new Q.UI.Button({
		asset:'tutorials/3cake.png',
		x:367,
		y:370,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || secondBtn.p.opacity == 0 || thirdBtn.p.opacity == 0 || fourthBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && secondBtn.p.opacity == 1 && thirdBtn.p.opacity == 1 && fourthBtn.p.opacity ==1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,4,3.1,1.9,2,op);
				// countDown();
			}
		}
	});
	fourthBtn =  new Q.UI.Button({
		asset:'tutorials/1rcake.png',
		x:525,
		y:370,
		opacity:0
	},function(){
		if(this.p.opacity == 0 || secondBtn.p.opacity == 0 || thirdBtn.p.opacity == 0 || fourthBtn.p.opacity == 0){
			this.p.opacity = 1;
			if(this.p.opacity == 1 && secondBtn.p.opacity == 1 && thirdBtn.p.opacity == 1 && fourthBtn.p.opacity ==1){
				addSprite(stage,305,670,'tutorials/squares.png');
				generateChoices(stage,4,3.1,1.9,2,op);
				// countDown();
			}
		}
	});
	stage.insert(firstBtn);
	stage.insert(secondBtn);
	stage.insert(thirdBtn);
	stage.insert(fourthBtn);
});

//END OF TUTORIALS

Q.load('mdas.png,playbtn.png,tutorialsbtn.png,backbtn.png,bgmusic.mp3,click.mp3,bg2.mp3,banana.mp3,wrong.mp3,heart.png',function(){
 	Q.stageScene('main');
});

// Q.load('backbtn.png,quiz/addbg.png,quiz/subtractbg.png,quiz/multiplybg.png,cupcake/box1.png,cupcake/box2.png,cupcake/box3.png,cupcake/box4.png,cupcake/box5.png,cupcake/box6.png,cupcake/box7.png,cupcake/box8.png,cupcake/box9.png,tutorials/squares.png',function(){
// 	Q.stageScene('advance');
// });


//function to add background
function addSprite(stage,positionX,positionY,image){
	stage.insert(new Q.Sprite({x:positionX,y:positionY,asset:image,scale:1}));
}

//function to add button
function addButton(stage,positionX,positionY,image,event){
	stage.insert(new Q.UI.Button({
		asset:image,
		x:positionX,
		y:positionY,
	},event));
}

//function to generate choices
function generateChoices(stage,a,b,c,d,op){
	var choice1Btn = new Q.UI.Button({x:120,y:670,label:a+'',font:"500 85px arial"});
	var choice2Btn = new Q.UI.Button({x:245,y:670,label:b+'',font:"500 85px arial"});
	var choice3Btn = new Q.UI.Button({x:370,y:670,label:c+'',font:"500 85px arial"});
	var choice4Btn = new Q.UI.Button({x:495,y:670,label:d+'',font:"500 85px arial"});
	 choice1Btn.on('click',function(){chars(choice1Btn,choice2Btn,choice3Btn,choice4Btn,2,op);});
	 choice2Btn.on('click',function(){chars(choice1Btn,choice2Btn,choice3Btn,choice4Btn,2,op);});
	 choice3Btn.on('click',function(){chars(choice1Btn,choice2Btn,choice3Btn,choice4Btn,2,op);});
	 choice4Btn.on('click',function(){chars(choice1Btn,choice2Btn,choice3Btn,choice4Btn,2,op);});

	stage.insert(choice1Btn);
	stage.insert(choice2Btn);
	stage.insert(choice3Btn);
	stage.insert(choice4Btn);
}

//function to identify the given operation
function getOperation(level){
	var op = 0;
	if(level == 'beginner'){
		op = Math.floor(Math.random()*2);
	}
	else if(level == 'advance'){
		op = Math.floor(Math.random()*3);
	}
	else if(level == 'genius'){
		op = Math.floor(Math.random()*4);
	}
	return op;
}

//function to generate random choices
function generateRandomChoices(stage,ans,level){
	var arr = [];
	while(arr.length < 3){
	    var randomnumber = Math.ceil(Math.random()*20)
	    if(arr.indexOf(randomnumber) > -1 || randomnumber == ans) continue;
	    arr[arr.length] = randomnumber;
	}
	arr.push(ans);
	var choice1Btn,choice2Btn,choice3Btn,choice4Btn;
	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	choice1Btn = new Q.UI.Button({x:120,y:670,label:arr[0]+'',font:"500 85px arial"},function(){
		if(arr[0] == ans){
			score++;
		}else{
			--life;
		}
		Q.audio.play('wrong.mp3');
		setColor(ans,arr,choice1Btn,choice2Btn,choice3Btn,choice4Btn);
		var time = 1;
		var x = setInterval(function(){
			if(time==0){
				clearInterval(x);
				Q.stageScene(level);
			}
			--time;
		},1000);
		
	});
	choice2Btn = new Q.UI.Button({x:245,y:670,label:arr[1]+'',font:"500 85px arial"},function(){
		if(arr[1] == ans){
			score++;
		}else{
			--life;
		}
		Q.audio.play('wrong.mp3');
		setColor(ans,arr,choice1Btn,choice2Btn,choice3Btn,choice4Btn);
		var time = 1;
		var x = setInterval(function(){
			if(time==0){
				clearInterval(x);
				Q.stageScene(level);
			}
			--time;
		},1000);
		
	});
	choice3Btn = new Q.UI.Button({x:370,y:670,label:arr[2]+'',font:"500 85px arial"},function(){
		if(arr[2] == ans){
			score++;
		}else{
			--life;
		}
		Q.audio.play('wrong.mp3');
		setColor(ans,arr,choice1Btn,choice2Btn,choice3Btn,choice4Btn);
		var time = 1;
		var x = setInterval(function(){
			if(time==0){
				clearInterval(x);
				Q.stageScene(level);
			}
			--time;
		},1000);
		
	});
	choice4Btn = new Q.UI.Button({x:495,y:670,label:arr[3]+'',font:"500 85px arial"},function(){
		if(arr[3] == ans){
			score++;
		}else{
			--life;
		}
		Q.audio.play('wrong.mp3');
		setColor(ans,arr,choice1Btn,choice2Btn,choice3Btn,choice4Btn);
		var time = 1;
		var x = setInterval(function(){
			if(time==0){
				clearInterval(x);
				Q.stageScene(level);
			}
			--time;
		},1000);
		
	});
	stage.insert(choice1Btn);
	stage.insert(choice2Btn);
	stage.insert(choice3Btn);
	stage.insert(choice4Btn);
}

//function to generate random given numbers from 0-9
function generateGiven(stage,op,level){
	var given1 = Math.floor((Math.random() * 9) +1);
	var given2 = Math.floor((Math.random() * 9) +1);
	if(given2 > given1){
		var g = given1;
		given1 = given2;
		given2 = g;
	}
	stage.insert(new Q.UI.Text({x:150,y:120,label:given1+'',size:100}));
	stage.insert(new Q.UI.Text({x:290,y:120,label:given2+'',size:100}));
	
	if(op == 0){
		var firstBtn,secondBtn;
		firstBtn = new Q.UI.Button({
			asset:getCakes(given1),
			x:180,
			y:382,
			opacity:0
		},function(){
			Q.audio.play('banana.mp3');
			this.p.opacity = 1;
		});
		secondBtn = new Q.UI.Button({
			asset:getCakes(given2),
			x:420,
			y:382,
			opacity:0
		},function(){

			if(firstBtn.p.opacity == 1 && secondBtn.p.opacity == 0){
				Q.audio.play('banana.mp3');
				this.p.opacity = 1;
				addSprite(stage,305,670,'tutorials/squares.png');
				generateRandomChoices(stage,given1 + given2,level);
			}
		});
		stage.insert(firstBtn);
		stage.insert(secondBtn);
	}
	else if(op == 1){
		var cake = new Q.UI.Button({
			asset:getCakes(given1),
			x:305,
			y:380
		},function(){
			if(this.p.asset == getCakes(given1)){
				Q.audio.play('banana.mp3');
				this.p.asset =getCakes(given1-given2);
				addSprite(stage,305,670,'tutorials/squares.png');
				generateRandomChoices(stage,given1 - given2,level);
			}
		});
		stage.insert(cake);
	}
	else if(op == 2){
		var firstBtn,secondBtn,thirdBtn;
		firstBtn =  new Q.UI.Button({
			asset:getCakes(given2),
			x:140,
			y:360,
			opacity:0
		},function(){
			Q.audio.play('banana.mp3');
			this.p.opacity = 1;
		});
		secondBtn =  new Q.UI.Button({
			asset:getCakes(given2),
			x:297,
			y:360,
			opacity:0
		},function(){
			if(firstBtn.p.opacity == 1){
				Q.audio.play('banana.mp3');
				this.p.opacity = 1;
			}
		});
		thirdBtn =  new Q.UI.Button({
			asset:getCakes(given2),
			x:455,
			y:360,
			opacity:0
		},function(){
			if(firstBtn.p.opacity == 1 && secondBtn.p.opacity == 1){
				Q.audio.play('banana.mp3');
				this.p.opacity = 1;
				addSprite(stage,305,670,'tutorials/squares.png');
				generateRandomChoices(stage,given1 * given2,level);
			}
		});
		stage.insert(firstBtn);
		stage.insert(secondBtn);
		stage.insert(thirdBtn);
	}
	else if(op == 3){
	}
	console.log(given1 + ' ' + given2 +' ');
}
function chars(choice1Btn,choice2Btn,choice3Btn,choice4Btn,ans,op){
	choice1Btn.p.fontColor = choice2Btn.p.fontColor = choice3Btn.p.fontColor = choice4Btn.p.fontColor="red";
	switch(ans){
		case 1:choice1Btn.p.fontColor = 'blue';break;
		case 2:choice2Btn.p.fontColor = 'blue';break;
		case 3:choice3Btn.p.fontColor = 'blue';break;
		case 4:choice4Btn.p.fontColor = 'blue';break;
	}	
	countDown(op);
}

//function to change the color of the choices
function setColor(ans,arr,choice1Btn,choice2Btn,choice3Btn,choice4Btn){
	choice1Btn.p.fontColor = 'red';
	choice2Btn.p.fontColor = 'red';
	choice3Btn.p.fontColor = 'red';
	choice4Btn.p.fontColor = 'red';
	if(arr[0] == ans){
		choice1Btn.p.fontColor = 'blue';
			}
	else if(arr[1] == ans){
		choice2Btn.p.fontColor = 'blue';
		
	}
	else if(arr[2] == ans){
		choice3Btn.p.fontColor = 'blue';
		
	}
	else if(arr[3] == ans){
		choice4Btn.p.fontColor = 'blue';
	}
}

//timer function
function countDown(op){
	Q.audio.stop();
	var time = 1;
	var x = setInterval(function(){
		// console.log(op);
		if(time==0){
			clearInterval(x);
			if(op == 'subtract')
				Q.stageScene('multiplytutorial');
			else if(op == 'multiply')
				Q.stageScene('divisiontutorial');
			else if(op == 'add')
				Q.stageScene('subtracttutorial');
			else
				Q.stageScene('main');
		}
		--time;
	},1000);
}

//function to determine what cake image to be display
function getCakes(num){
	var str = '';
	switch(num){
		case 1 : str = 'cupcake/box1.png';break;
		case 2 : str = 'cupcake/box2.png';break;
		case 3 : str = 'cupcake/box3.png';break;
		case 4 : str = 'cupcake/box4.png';break;
		case 5 : str = 'cupcake/box5.png';break;
		case 6 : str = 'cupcake/box6.png';break;
		case 7 : str = 'cupcake/box7.png';break;
		case 8 : str = 'cupcake/box8.png';break;
		case 9 : str = 'cupcake/box9.png';break;
	}
	return str;
}

function generateLife(stage){
	var X = 520;
	for(var i=life;i>0;--i){
		stage.insert(new Q.Sprite({y:520,x:X,asset:'heart.png'}));
		X-=60;
	}
}
});