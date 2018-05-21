import $ from 'jquery'

var GoTop  = require('./GoTop')
var Carousel = require('./carousel')

new GoTop($('body'))
console.log(123)
Carousel.launch($('.container'))

render()
function render(){
var i
console.log('render')
var windowWidth = $('.imgs-container').width();
var itemWidth = $('.img-container').outerWidth(true);
var colNum = parseInt(windowWidth/itemWidth)
var colHeights = []
var $items = $('.img-container')
for(i = 0; i < colNum; i++){
	colHeights[i] = 0
}
for(i=0; i < $items.length; i++){
	var minHeight = Math.min.apply(null,colHeights)
	var minHeightIndex = colHeights.indexOf(minHeight)
	$items.eq(i).css({'top':`${minHeight}px`,'left':`${minHeightIndex*itemWidth}px`})
	colHeights[minHeightIndex] += $items.eq(i).outerHeight(true)
	//撑起父容器高度
	//$('.imgs-container').height(colHeights[minHeightIndex] + 60)
	//$('#loadPoint').css({'top': colHeights[minHeightIndex] + 60})
}
}

//exposure
var _Exposure = (function(){
  function Exposure($node,callback){
  this.$node = $node
  this.callback = callback
  this.checkShow()
  this.bind()
}

Exposure.prototype.bind = function(){
  var _this = this
  $('#loadmore').on('click', function(){
    if(_this.isShow(_this.$node)){
      _this.callback()
    }
  })
}

Exposure.prototype.checkShow = function(){
    if(this.isShow(this.$node)){
    	console.log(this.callback)
      this.callback()
      
    }
}

Exposure.prototype.isShow = function(){
  var offset = this.$node.css('top');
  var scrollTop = $('.imgs-container').css('height');
  //var windowHeight = $(window).height()
  if(offset < scrollTop){
      return true
  }else{
      return false
  } 
}

Exposure.prototype.loadPic = function(){
  if( isShow(node) && !isLoaded(node)){
    node.attr('src',node.attr('data-src'))
  } 
}

return {
   launch: function($node,callback){
     $node.each(function(index,element){
        new Exposure($(element),callback)
      })
   }
}
})()

$('#loadmore').on('click',function(){
	//console.log(123)
	var height = $('.imgs-container').height()
	$('.imgs-container').height( height + 250)
	setTimeout(function(){
		_Exposure.launch($('.img-container'), function(){
      	this.$node.find('img')
      			  .attr('src',this.$node.find('img').attr('data-src'))
		})
	},100)
	setTimeout(function(){
		render()
	},200)
})

