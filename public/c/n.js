(function(){
var C={},F={},root=document.getElementById("a");

function canPrefetch(){
  var c=navigator.connection;
  if(c&&(c.saveData||c.effectiveType==="slow-2g"||c.effectiveType==="2g"))return false;
  return true;
}

function prefetch(h){
  if(C[h]||F[h]||!canPrefetch())return;
  F[h]=1;
  fetch(h).then(function(r){return r.text()}).then(function(html){
    var doc=new DOMParser().parseFromString(html,"text/html");
    var el=doc.getElementById("a");
    var t=doc.querySelector("title");
    C[h]={h:el?el.innerHTML:"",t:t?t.textContent:""};
  }).catch(function(){delete F[h]});
}

function init(){
  bind(root);
  hl();
  mb();
}

function bind(el){
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
  el.querySelectorAll("a[href]").forEach(function(a){
    if(a.dataset.b)return;
    a.dataset.b="1";
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
    a.addEventListener("click",function(e){
      e.preventDefault();
      go(h);
    });
  });
}

function go(url){
  if(url===location.pathname)return;
  history.pushState(null,"",url);
  load(url);
}

function load(url){
  var cached=C[url];
  if(cached){swap(cached);return}
  fetch(url).then(function(r){return r.text()}).then(function(html){
    var doc=new DOMParser().parseFromString(html,"text/html");
    var a=doc.getElementById("a");
    var t=doc.querySelector("title");
    var data={h:a?a.innerHTML:"",t:t?t.textContent:""};
    C[url]=data;
    swap(data);
  });
}

function swap(data){
  root.innerHTML=data.h;
  if(data.t)document.title=data.t;
  bind(root);
  hl();
  mb();
  scrollTo(0,0);
}

function hl(){
  if(typeof hljs!=="undefined")root.querySelectorAll("pre code").forEach(function(el){hljs.highlightElement(el)});
}

function mb(){
  var m=document.getElementById("mb"),n=document.getElementById("nr");
  if(m){
    var nm=m.cloneNode(true);
    m.parentNode.replaceChild(nm,m);
    nm.addEventListener("click",function(){nm.classList.toggle("op");n.classList.toggle("vo")});
  }
}

window.addEventListener("popstate",function(){load(location.pathname)});
init();
})();
