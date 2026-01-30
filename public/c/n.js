(function(){
var C={},root=document.getElementById("a");

function init(){
  bind(root);
  hl();
  mb();
}

function bind(el){
  el.querySelectorAll("a[href]").forEach(function(a){
    if(a.dataset.b)return;
    a.dataset.b="1";
    var h=a.getAttribute("href");
    if(!h||h.startsWith("http")||h.startsWith("/portfolio")||a.target==="_blank")return;
    a.addEventListener("pointerenter",function(){
      if(!C[h])fetch(h).then(function(r){return r.text()}).then(function(html){
        var doc=new DOMParser().parseFromString(html,"text/html");
        var el=doc.getElementById("a");
        var t=doc.querySelector("title");
        C[h]={h:el?el.innerHTML:"",t:t?t.textContent:""};
      });
    },{once:true});
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
