var __pageOrder = ['Home.html','Projects.html','Contact.html','About.html'];
var __debounce = false;
function _currentPageIndex(){
  var path = window.location.pathname.replace(/\\/g,'/').split('/').pop();
  var idx = __pageOrder.indexOf(path);
  return idx;
}
function _goto(idx){
  if(idx<0||idx>=__pageOrder.length) return;
  if(__debounce) return;
  __debounce = true;
  window.location.href = __pageOrder[idx];
  setTimeout(function(){__debounce=false;},800);
}
function _handleWheel(e){
  if(__debounce) return;
  var idx = _currentPageIndex();
  if(idx<0) return;
  var doc = document.documentElement;
  var atBottom = (window.innerHeight + window.pageYOffset) >= (doc.scrollHeight - 40);
  var atTop = window.pageYOffset <= 40;
  if(e.deltaY>0 && atBottom){
    _goto(idx+1);
  } else if(e.deltaY<0 && atTop){
    _goto(idx-1);
  }
}
function _handleKey(e){
  if(__debounce) return;
  var idx = _currentPageIndex(); if(idx<0) return;
  if(e.key === 'PageDown' || e.key === 'ArrowDown') _goto(idx+1);
  if(e.key === 'PageUp' || e.key === 'ArrowUp') _goto(idx-1);
}

var touchStartY = null;
function _touchStart(e){ touchStartY = e.touches[0].clientY; }
function _touchEnd(e){
  if(touchStartY===null) return;
  var endY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : null;
  if(endY===null) return; var dy = touchStartY - endY;
  var idx = _currentPageIndex(); if(idx<0) return;
  if(dy>60){ 
    var doc = document.documentElement;
    var atBottom = (window.innerHeight + window.pageYOffset) >= (doc.scrollHeight - 40);
    if(atBottom) _goto(idx+1);
  } else if(dy<-60){ 
    if(window.pageYOffset <= 40) _goto(idx-1);
  }
  touchStartY = null;
}
document.addEventListener('wheel', _handleWheel, {passive:true});
document.addEventListener('keydown', _handleKey);
document.addEventListener('touchstart', _touchStart, {passive:true});
document.addEventListener('touchend', _touchEnd, {passive:true});


window.__revealAbout = function(){
  try{ localStorage.setItem('revealAbout','1'); }catch(e){}
};
