(function(){
function canPrefetch(){
  var c=navigator.connection;
  if(c&&(c.saveData||c.effectiveType==="slow-2g"||c.effectiveType==="2g"))return false;
  return true;
}

var F={};
function prefetch(h){
  if(F[h]||!canPrefetch())return;
  F[h]=1;
  var l=document.createElement("link");
  l.rel="prefetch";
  l.href=h;
  document.head.appendChild(l);
}

function init(){
  var io=window.IntersectionObserver&&new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      var h=e.target.getAttribute("href");
      io.unobserve(e.target);
      if(typeof requestIdleCallback!=="undefined"){
        requestIdleCallback(function(){prefetch(h)});
      }else{
        setTimeout(function(){prefetch(h)},200);
      }
    });
  },{rootMargin:"200px 0px"});

  document.querySelectorAll("a[href]").forEach(function(a){
    var h=a.getAttribute("href");
    if(!h||h.startsWith("http")||h.startsWith("/portfolio")||a.target==="_blank")return;
    var tid;
    a.addEventListener("pointerenter",function(){
      tid=setTimeout(function(){prefetch(h)},65);
    });
    a.addEventListener("pointerleave",function(){
      if(tid)clearTimeout(tid);
    });
    if(io)io.observe(a);
  });

  var m=document.getElementById("mb"),n=document.getElementById("nr");
  if(m)m.addEventListener("click",function(){m.classList.toggle("op");n.classList.toggle("vo")});
}

init();
})();
