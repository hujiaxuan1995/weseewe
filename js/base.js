window.onload = init;
var right = 0;
var id = 0;
var wrapper;
var weseewe;
var index = 1;
var colors = ["#f58292","#33cccc","#7a48cc","#eec968","#64e36a"];//红色 蓝色 紫色 黄色 绿色
var block_list = [];
var queue = new Queue();
function Queue(){
	this.data = [];
	this.length = this.data.length;
	this.first = null;
	this.end = null;
	this.enqueue = function(e){ //队尾插入
		var item = this.length;
		for(;item>0;item--){
			this.data[item] = this.data[item-1];
		}
		this.data[0] = e;
		this.length++;
	};
	this.dequeue = function(){ //队头删除
		var item = this.length;
		this.lenght--;
	}
	this.getIndex = function(myindex){
		return this.data[myindex];
	};
}
function weblock(object){
	this.height = 0;
	this.right = 0;
	this.weseewe = object;
	var id;
	this.height = queue.getIndex(5).height;
	this.weseewe.style.bottom = queue.getIndex(5).height+"px";
	this.jump = function(){
		var t = 0;
		var v = 50;
		var a = 12.5;
		var s = 0;
		var height = this.height;
		 id=setInterval(function(){
			var temp = a*t*t;
			var h = v*t - temp;
			s = height + h;
			this.weseewe.style.bottom = s +"px";
			console.log(height);
			t = t+0.02;
			if(t > 4){
				clearInterval(id);
			}
		},1);
	};
	this.jump_again = function(){

	};
}
function init(){
	blocks = document.getElementsByClassName("blocks");
	wrapper = document.getElementsByClassName("wrapper")[0];
	weseewe = document.getElementsByClassName("weseewe")[0];
	// create_block();
	var m = new move();
	var we = new weblock(weseewe);
	var flag = 0;//暂停
	var flag2 = 0;//跳跃，0表示还未跳起，1表示已经跳起
	var first_time = 0;
	var last_time = 0;
	document.onkeydown = function(event){
		var event = window.event?window.event:event;
		// if(event.keyCode == 32){
		// 	move();
		// }
		switch(event.keyCode){
			case(13) : 
			if(flag == 0){
				m.start();
				flag = 1;
			}
			break;
			case(80) : 
			if(flag == 1){
				m.pause();
				flag = 0;
			}
			break;
			case(32) :
				
				if(flag2 == 1){
					var date = new Date();
					last_time = date.getTime();
					if(last_time - first_time < 2){
						we.jump_again();
					}
					flag2 = 0;	
				}
				if(flag2 == 0){
					flag2 = 1;
					var date = new Date();
					first_time = date.getTime();
					we.jump();
				}
				
				break;
			default:break;
		};
	};

}

function myblock(index){
	this.right = index*80;
	this.height = 0;
	this.block = 0;
	this.backgroundColor = 0;
	this.get_height = function(){
		return this.height;
	};
	this.set_height = function(){
		var rand = Math.random();
		
		this.height = 300+100*rand;
		
	};
	this.set_backgroundColor = function(){
		var rand = Math.random();
		var i = parseInt(5*rand,10);
		this.backgroundColor = colors[i];
	};
	this.move_step = function(){
		this.right +=1;
		this.block.style.right = this.right + "px";
	};
	this.block = document.createElement("div");
	this.block.setAttribute("class","blocks");
	this.block.style.right = 80*index + "px";
	this.set_height();
	this.set_backgroundColor();
	this.block.style.backgroundColor = this.backgroundColor;
	this.block.style.height = this.height+"px";
	if(blocks[0]){
		wrapper.insertBefore(this.block,blocks[0]);
	}else{
		wrapper.appendChild(this.block);
	}
}



function create_block(){
	var block = document.createElement("div");
	block.setAttribute("class","blocks");
	block.style.height = "320px";
	block.style.right = "80px";
	block.style.backgroundColor = "";
	wrapper.appendChild(block);
}

function move(){
	//console.log("hello");
	//console.log(obj);
	//
	//console.log(obj.style.right);
	var block0 = new myblock(0);
	var block1 = new myblock(1);
	var block2 = new myblock(2);
	var block3 = new myblock(3);
	var block4 = new myblock(4);
	var block5 = new myblock(5);
	var id;
	// block_list.push(block0);
	// block_list.push(block1);
	// block_list.push(block2);
	// block_list.push(block3);
	// block_list.push(block4);
	// block_list.push(block5);
	queue.enqueue(block5);
	queue.enqueue(block4);
	queue.enqueue(block3);
	queue.enqueue(block2);
	queue.enqueue(block1);
	queue.enqueue(block0);

	this.start = function(){
		id = setInterval(function(){


			// right = right + 1;
			// obj.style.right = right+"px";

		for(var item = 0;item<queue.length;item++){
			var e = queue.getIndex(item);
			e.move_step();
			if(e.right == 401){
			    queue.dequeue(e);
				var ablock = new myblock(-1);
				queue.enqueue(ablock);
			}
			// if(block.right == 480){
			// 	clearInterval(id);
			// }
		};
	},5);
	};
	this.pause = function(){
		clearInterval(id);
	};
}

