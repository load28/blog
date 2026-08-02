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

function magazine(){
  var im=document.getElementById("im");
  if(im){
    var hro=document.querySelector(".hro"),cs=document.querySelectorAll(".stc");
    var apx=function(){
      if(hro){
        var p=Math.min(1,Math.max(0,scrollY/(innerHeight*.62)));
        hro.style.opacity=1-p;
        hro.style.transform="translateY("+(-p*46)+"px) scale("+(1-p*.05)+")";
      }
      cs.forEach(function(c,i){
        var nx=cs[i+1];
        if(!nx)return;
        var r=nx.getBoundingClientRect(),
            pr=Math.min(1,Math.max(0,1-(r.top-34)/(innerHeight*.72))),
            w=c.firstChild;
        w.style.transform="scale("+(1-pr*.07).toFixed(4)+")";
        w.style.opacity=(1-pr*.65).toFixed(3);
        w.style.filter=pr>.01?"blur("+(pr*2.5).toFixed(2)+"px)":"";
      });
    };
    addEventListener("scroll",apx,{passive:true});
    apx();
  }

  if(matchMedia("(hover:hover)").matches){
    document.querySelectorAll(".scd").forEach(function(el){
      el.addEventListener("mousemove",function(e){
        var r=el.getBoundingClientRect(),
            x=(e.clientX-r.left)/r.width-.5,
            y=(e.clientY-r.top)/r.height-.5;
        el.style.transform="perspective(600px) rotateY("+(x*5).toFixed(2)+"deg) rotateX("+(-y*5).toFixed(2)+"deg) translateY(-2px)";
      });
      el.addEventListener("mouseleave",function(){el.style.transform=""});
    });
  }

  var rv=document.querySelectorAll(".rv");
  if(rv.length){
    if(window.IntersectionObserver){
      var ro=new IntersectionObserver(function(es){
        es.forEach(function(en){
          if(en.isIntersecting){en.target.classList.add("in");ro.unobserve(en.target)}
        });
      },{rootMargin:"0px 0px -20px 0px"});
      rv.forEach(function(el){ro.observe(el)});
    }else{
      rv.forEach(function(el){el.classList.add("in")});
    }
  }
}

init();
magazine();
})();
