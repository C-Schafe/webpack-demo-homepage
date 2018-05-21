var $ = require('../lib/jquery.min')

function Carousel($node){
  console.log(1)
  this.$node = $node
  this.init()
  this.bind()
}

Carousel.prototype.init = function(){
  console.log('init')
  this.$imgs = this.$node.find('.imgs img')
  this.$imgsCt = this.$node.find('.imgs')
  this.imgCount = this.$imgs.length
  this.imgWidth = this.$imgs.width()
  this.pageIndex = 0
  this.isAnimeted = false
  this.$node.find('.imgs').append($('#img0').clone())
  this.$node.find('.imgs').prepend($('#img3').clone())
  $('a').on('click',function(e){
    e.preventDefault()
  })
}

Carousel.prototype.bind = function(){
  console.log('bind')
  var _this = this
  this.$node.find('.playNext').on('click',function(){
    if(!_this.isAnimeted){
      _this.playNext()
    }
  })
  this.$node.find('.playPre').on('click',function(){
    if(!_this.isAnimeted){
      _this.playPre()
    }
  })
  this.$node.find('.bullets').on('click','li',function(){
    var $this = $(this)
    var clickIndex = $this.index()
    if(clickIndex > _this.pageIndex){
      _this.$imgsCt.animate({left: '-='+((clickIndex - _this.pageIndex) * _this.imgWidth)})
      _this.pageIndex = clickIndex
      _this.setBullet()
    }else if(clickIndex < _this.pageIndex){
      _this.$imgsCt.animate({left: '+='+((_this.pageIndex - clickIndex) * _this.imgWidth)})
      _this.pageIndex = clickIndex
      _this.setBullet()
    }
  })
}

Carousel.prototype.playNext = function(){
  console.log('next')
  this.isAnimeted = true
  var _this = this
  this.$node.find('.imgs').animate({left: '-='+ _this.imgWidth},function(){
    _this.pageIndex++
    if( _this.pageIndex === _this.imgCount){
      _this.pageIndex = 0
      _this.$node.find('.imgs').css({'left':'0px'})
    }
    _this.setBullet()
    _this.isAnimeted = false
  })
}

Carousel.prototype.playPre = function(){
  console.log('pre')
  var _this = this
  _this.isAnimeted = true
  this.$node.find('.imgs').animate({left: '+='+ _this.imgWidth},function(){
    _this.pageIndex--
    if( _this.pageIndex === -1){
      _this.pageIndex = 3
      _this.$node.find('.imgs').css({'left': -(_this.imgWidth*_this.imgCount)})
    }
    _this.setBullet()
    _this.isAnimeted = false
  })
}

Carousel.prototype.setBullet = function(){
  this.$node.find('.bullets li').removeClass('active')
                  .eq(this.pageIndex)
                  .addClass('active')
}


Carousel.launch= function($node){
  $node.each(function(index,element){
    console.log(123)
    new Carousel($(element))
  })
}
 
module.exports = Carousel
    