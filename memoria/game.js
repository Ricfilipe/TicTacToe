function StateManager() {

	var state = {},
		active = null,
		anim = 1,
		right = false;
		this.next = false;
	this.active_name = null;

	this.add = function() {
		for (var i = arguments.length; i--;) {
			var arg = arguments[i];
			state[arg.name] = arg;
		}
	}
	
	
	this.set = function(name) {
		active = state[name];
		this.active_name = name;
	}
	this.get = function(name) {
		return state[name];
	}
	this.change = function(name, _right) {
		anim = 0;
		right = _right || false;
		this.next = name;
		this.active_name = name;
	}
	this.tick = function(ctx) {
		if (this.next) {
			if (anim <= 1) {
				anim += 0.02;
				
				active.update();
				state[this.next].update();

				var c1 = active.render(),
					c2 = state[this.next].render(),

					c1w = c1.width,
					c1h = c1.height,
					c2w = c2.width,
					c2h = c2.height,

					res = 2,

					p,
					t = anim;
				p = t < 0.5 ? 2*t*t : -2*(t*(t -2)) - 1;

				if (right) {
					p = 1 - p;
					var t = c2;
					c2 = c1;
					c1 = t;
				}

				for (var i = 0; i < c1h; i += res) {
					ctx.drawImage(c1, 0, i, c1w, res,
						(c1h - i)*p*0.2,
						i - p*i,
						c1w - (c1h - i)*p*0.4,
						res
					);
				}
				p = 1 - p;
				for (var i = 0; i < c2h; i += res) {
					ctx.drawImage(c2, 0, i, c2w, res,
						 i*p*0.2,
						i - (i - c2h)*p,
						c1w - i*p*0.4,
						res
					);
				}

			} else {
				active = state[this.next];
				this.next = false;
				active.update();
				active.render(ctx);
			}
		} else {
			active.update();
			active.render(ctx);
		}
	}
}

function Tile(x, y,type) {
	this.hidden_t;

	var x = x, y = y;
	var undo = false;
	var tile = Tile.BLANK;
	var anim = 0;

	if (tile == null) {
		(function() {
			var _c = document.createElement("canvas");
			_c.width = _c.height = 160;
			var _ctx = _c.getContext("2d");

			_ctx.fillStyle = "#00ff99";
			_ctx.lineWidth = 10;
			_ctx.strokeStyle = "#ff6666";
			_ctx.lineCap = "round";

			// Blank
			_ctx.fillRect(0, 0, 160, 160);
			Tile.BLANK = new Image();
			Tile.BLANK.src = _c.toDataURL();

			// IM0
			_ctx.fillStyle = "#ff6666";
			_ctx.translate(5, 5);
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM0 = new Image();
			Tile.IM0.src = _c.toDataURL();
			
			// IM1
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#ffcc66";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM1 = new Image();
			Tile.IM1.src = _c.toDataURL();

			// IM2
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#ff0000";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM2 = new Image();
			Tile.IM2.src = _c.toDataURL();
			
			// IM3
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#ff33cc";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM3 = new Image();
			Tile.IM3.src = _c.toDataURL();
			
			// IM4
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#66ff33";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM4 = new Image();
			Tile.IM4.src = _c.toDataURL();
			
			// IM5
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#00ffcc";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM5 = new Image();
			Tile.IM5.src = _c.toDataURL();
			
			// IM6
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#ffffff";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM6 = new Image();
			Tile.IM6.src = _c.toDataURL();
			
			// IM7
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#000000";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM7 = new Image();
			Tile.IM7.src = _c.toDataURL();
			
			// IM8
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#0000cc";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM8 = new Image();
			Tile.IM8.src = _c.toDataURL();
			
			// IM9
			_ctx.fillStyle = "#00ff99";
			_ctx.fillRect(0, 0, 160, 160);
			_ctx.fillStyle = "#cc99ff";
			_ctx.fillRect(0, 0, 150, 150);
			Tile.IM9 = new Image();
			Tile.IM9.src = _c.toDataURL();
			
		})();
		tile = Tile.BLANK;
	
	
	}
	
	switch(type){
		case 0:
			this.hidden_t=Tile.IM0;
			break;
		case 1:
			this.hidden_t=Tile.IM1;
			break;
		case 2:
			this.hidden_t=Tile.IM2;
			break;
		case 3:
			this.hidden_t=Tile.IM3;
			break;
		case 4:
			this.hidden_t=Tile.IM4;
			break;
		case 5:
			this.hidden_t=Tile.IM5;
			break;
		case 6:
			this.hidden_t=Tile.IM6;
			break;
		case 7:
			this.hidden_t=Tile.IM7;
			break;
		case 8:
			this.hidden_t=Tile.IM8;
			break;
		case 9:
			this.hidden_t=Tile.IM9;
		}

	this.undoTile = function(){
		anim = 2;
		undo=true;
	}
	
	this.getHidden = function(){
		return hidden_t;
	}
	
	this.active = function() {
		return anim > 0.20;
	}

	this.equals = function(_tile) {
		return this.hidden_t === _tile.hidden_t;
	}

	this.hasData = function() {
		return tile !== Tile.BLANK;
	}

	this.set = function(next) {
		tile = next;
	}

	this.flip = function() {
		undo=false;
		tile = this.hidden_t;
		anim = 1;
	}

	this.update = function() {
		if (anim > 0) {
			anim -= 0.02;
		}
	}

	this.draw = function(ctx) {
		if (anim <= 0||anim>1) {
			ctx.drawImage(tile, x, y);
			return;
		}
		
		if(undo==true && anim >0){
		tile=Tile.BLANK;
		}
		
		var res = 2;
		if(!undo){
		var t = anim > 0.5 ? Tile.BLANK : tile;
		}else{
		var t = anim > 0.5 ? this.hidden_t : tile;
		}
		var p = -Math.abs(2*anim - 1) + 1;

		p *= p;

		for (var i = 0; i < 160; i += res) {
			if(!undo){
				var j = 50 - (anim > 0.5 ? 160 - i : i);
			}else{
			var j = 50 - (anim > 0.5 ? i: 160 - i );
			}
			
			ctx.drawImage(t, i, 0, res, 160,
				x + i - p*i + 50*p,
				y - j*p*0.2,
				res,
				160 + j*p*0.4
			);
		}
	}
	

}





function MenuButton(text, x, y, cb,h,w) {


	var text = text, x = x, y = y, callback = cb;
	var hover, normal, rect = {};

	canvas.addEventListener("mousedown", function(evt) {
		if (state.active_name !== "menu" ) return;

		if (rect.hasPoint(mouse.x, mouse.y)) {
			if (callback) {
				callback();
			}
		}
	}, false);

	(function() {
		var _c = document.createElement("canvas"),
			_w = _c.width = w,
			_h = _c.height = h,
			_lw = 2,
			s = 10;

		rect.x = x;
		rect.y = y;
		rect.width = _c.width;
		rect.height = _c.height;

		_w -= _lw;
		_h -= _lw;

		var _ctx = _c.getContext("2d");

		_ctx.fillStyle = "white";
		_ctx.strokeStyle = "#00ff99";
		_ctx.lineWidth = _lw;
		_ctx.font = "40px Helvetica";

		_ctx.translate(_lw/2, _lw/2);
		_ctx.beginPath();
		_ctx.arc(s, s, s, Math.PI, 1.5*Math.PI);
		_ctx.arc(_w-s, s, s, 1.5*Math.PI, 0);
		_ctx.arc(_w-s, _h-s, s, 0, 0.5*Math.PI);
		_ctx.arc(s, _h-s, s, 0.5*Math.PI, Math.PI);
		_ctx.closePath();
		_ctx.fill();
		_ctx.stroke();

		_ctx.fillStyle = _ctx.strokeStyle;
		var _txt = text;
		_ctx.fillText(_txt, (_w - _ctx.measureText(_txt).width)/2, 50);

		normal = new Image();
		normal.src = _c.toDataURL();

		_ctx.fill();
		_ctx.stroke();

		_ctx.fillStyle = "white";
		_ctx.fillText(_txt, (_w - _ctx.measureText(_txt).width)/2, 50);

		hover = new Image();
		hover.src = _c.toDataURL();
	})();

	rect.hasPoint = function(x, y) {
		var xl = this.x < x && x < this.x+this.width,
			yl = this.y < y && y < this.y+this.height;

		return xl && yl;
	}

	this.draw = function(ctx) {
		var tile = rect.hasPoint(mouse.x, mouse.y) && (state.active_name==="menu")? hover : normal;
		ctx.drawImage(tile, x, y);
	}

}

function Scene(width, height) {
	
	var width = width, height = height;

	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	
	var ctx = canvas.getContext("2d");

	this.getContext = function() {
		return ctx;
	}
	


	this.getCanvas = function() {
		return canvas;
	}

	this.draw = function(_ctx) {
		_ctx.drawImage(canvas, 0, 0);
	}
}