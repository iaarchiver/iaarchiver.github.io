$(function(){function a(){$(".sidebar").scrollable()}function b(a){g.stop(!0,!1).animate({right:"326px"},250,"swing"),h.stop(!0,!1).animate({opacity:1},250),f.stop(!0,!1).animate({marginLeft:"-320px"},250,"swing",function(){i=!1,a&&a()})}function c(a){g.stop(!0,!1).animate({right:"6px"},250,"swing"),h.stop(!0,!1).animate({opacity:.3},250),f.stop(!0,!1).animate({marginLeft:0},250,"swing",function(){i=!0,a&&a()})}function d(){h.stop(!0,!1).animate({width:"100%"},250,"swing"),g.stop(!0,!1).animate({right:"100%"},250,"swing"),f.stop(!0,!1).animate({marginLeft:"-100%"},250,"swing",function(){j=!1,a()})}function e(){document.body.style.pointerEvents="none",h.stop(!0,!1).animate({width:"320px"},250,"swing"),g.stop(!0,!1).animate({right:"326px"},250,"swing"),f.stop(!0,!1).animate({marginLeft:"-320px"},250,"swing",function(){j=!0,document.body.style.pointerEvents="auto",a()})}$(".sidebar").scrollable(),$(window).resize(a);var f=$(".wrapper"),g=$(".logo"),h=$(".sidebar"),i=!0;g.on({mouseenter:function(){i?b():c()}}),f.on({mouseenter:function(){i||c()}});var j=!0;$(".sidebar .show-archive").on({click:function(){j?d():e()}}),$(".sidebar a:not(.show-archive)").each(function(){$.data(this,"href",this.href),$(this).attr("href","#")}),$(".sidebar a:not(.show-archive)").on({click:function(){var a=this;document.body.style.pointerEvents="none",c(function(){document.body.style.pointerEvents="auto",location.href=$(a).data("href")})}})}),function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var e,f=b||window.event,g=[].slice.call(arguments,1),h=0,i=0,j=0,k=0,l=0;return b=a.event.fix(f),b.type="mousewheel",f.wheelDelta&&(h=f.wheelDelta),f.detail&&(h=-1*f.detail),f.deltaY&&(j=-1*f.deltaY,h=j),f.deltaX&&(i=f.deltaX,h=-1*i),void 0!==f.wheelDeltaY&&(j=f.wheelDeltaY),void 0!==f.wheelDeltaX&&(i=-1*f.wheelDeltaX),k=Math.abs(h),(!c||c>k)&&(c=k),l=Math.max(Math.abs(j),Math.abs(i)),(!d||d>l)&&(d=l),e=h>0?"floor":"ceil",h=Math[e](h/c),i=Math[e](i/d),j=Math[e](j/d),g.unshift(b,h,i,j),(a.event.dispatch||a.event.handle).apply(this,g)}var c,d,e=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],f="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];if(a.event.fixHooks)for(var g=e.length;g;)a.event.fixHooks[e[--g]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=f.length;a;)this.addEventListener(f[--a],b,!1);else this.onmousewheel=b},teardown:function(){if(this.removeEventListener)for(var a=f.length;a;)this.removeEventListener(f[--a],b,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})}),function(a){a.fn.scrollable=function(b){var b=a.extend({},a.fn.scrollable.defaults,b),c=b.speed;return a.event.special.mousewheel?(a(this).each(function(){!a(this).find(">.s_container").size()&&a(this).unbind("mouseenter").wrapInner('<div class="s_container" style="height:auto">').find(">:first-child").css({width:a(this).width,overflow:"hidden",position:"relative"}).append('<div class="scrollbar">');var b=a(this),d=b.find(">.s_container"),e=(b.width(),b.height()),f=d.innerHeight(),g=e*e/f;console.log(g),b.unbind("mouseenter").unbind("mousewheel"),e>=f&&d.css("marginTop",0),f>e&&b.bind("mousewheel",function(a,h){var i=parseInt(d.css("marginTop")),j=i+h*c;0>j&&j>=-f+e&&(a.preventDefault()||d.css("marginTop",j))&&b.find(".scrollbar").css("top",-j*(f-g)/(f-e)),j>=0&&0>i&&(a.preventDefault()||d.css("marginTop",0))&&b.find(".scrollbar").css("top",0),-f+e>j&&i>-f+e&&(a.preventDefault()||d.css("marginTop",-f+e))&&b.find(".scrollbar").css("top",f-g),0>j&&parseInt(d.css("marginTop"))<-f+e&&h>0&&(a.preventDefault()||d.css("marginTop",j))}).hover(function(){b.find(".scrollbar").fadeIn()},function(){b.find(".scrollbar").fadeOut()}).find(".scrollbar").css("height",g).fadeIn().delay(1e3).fadeOut()}),this):(console.log("error: no mousewheel.js"),!1)},a.fn.scrollable.defaults={speed:24}}(jQuery);