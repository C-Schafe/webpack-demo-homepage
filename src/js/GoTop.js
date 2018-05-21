var $ = require('../lib/jquery.min')

function GoTop($ct){
	this.ct = $ct
	this.target = $('<button class="gotop">&#xe631;</button>')
	this.bindEvent()
	this.createNode()
}

GoTop.prototype = {
	bindEvent: function(){
		
		this.target.on('click',function(){
			console.log('scroll')
			$('html').animate({scrollTop:0}, 500)
		})
	},
	createNode: function(){
		
		this.ct.append(this.target)
		this.target.css({'position':'fixed','bottom':'-30px','right':'30px'})
	}
}

module.exports = GoTop




