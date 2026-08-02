(function(){
var d=document;
function $(s,el){return (el||d).querySelectorAll(s)}

/* header border + progress bar + immersive home scroll choreography */
var hd=d.getElementById("hd"),pb=d.getElementById("pb"),im=d.getElementById("im"),
    hro=d.querySelector(".hro"),cs=$(".stc"),
    rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function sm(v){return v<=0?0:v>=1?1:v*v*(3-2*v)}
function onScroll(){
  if(hd)hd.classList.toggle("sc",scrollY>10);
  if(pb){
    var t=d.documentElement.scrollHeight-innerHeight;
    pb.style.transform="scaleX("+(t>0?Math.min(1,scrollY/t):0)+")";
  }
  if(im&&!rm){
    var vh=innerHeight;
    if(hro){
      var p=Math.min(1,Math.max(0,scrollY/(vh*.62)));
      hro.style.opacity=1-p;
      hro.style.transform="translateY("+(-p*46)+"px) scale("+(1-p*.05)+")";
    }
    cs.forEach(function(c){
      var r=c.getBoundingClientRect();
      if(r.bottom<-80||r.top>vh+80)return;
      c.style.setProperty("--i",sm((vh*.95-r.top)/(vh*.5)).toFixed(4));
      c.style.setProperty("--o",sm((r.bottom-vh*.06)/(vh*.32)).toFixed(4));
    });
  }
}
addEventListener("scroll",onScroll,{passive:true});
onScroll();

/* card navigation (feed cards are not anchors so tag links can nest inside) */
$("[data-hf]").forEach(function(el){
  el.addEventListener("click",function(e){
    if(e.target.closest("a"))return;
    location.href=el.getAttribute("data-hf");
  });
});

/* center active chip in mobile chip bar */
var on=d.querySelector(".sbi .ch.on");
if(on)on.scrollIntoView({block:"nearest",inline:"center"});

/* prefetch internal links */
function canPrefetch(){
  var c=navigator.connection;
  if(c&&(c.saveData||c.effectiveType==="slow-2g"||c.effectiveType==="2g"))return false;
  return true;
}
var F={};
function prefetch(h){
  if(F[h]||!canPrefetch())return;
  F[h]=1;
  var l=d.createElement("link");
  l.rel="prefetch";
  l.href=h;
  d.head.appendChild(l);
}
function watch(el,h){
  var tid;
  el.addEventListener("pointerenter",function(){
    tid=setTimeout(function(){prefetch(h)},65);
  });
  el.addEventListener("pointerleave",function(){
    if(tid)clearTimeout(tid);
  });
  if(io)io.observe(el);
}
var io=window.IntersectionObserver&&new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting)return;
    var h=e.target.getAttribute("href")||e.target.getAttribute("data-hf");
    io.unobserve(e.target);
    if(typeof requestIdleCallback!=="undefined"){
      requestIdleCallback(function(){prefetch(h)});
    }else{
      setTimeout(function(){prefetch(h)},200);
    }
  });
},{rootMargin:"200px 0px"});
$("a[href]").forEach(function(a){
  var h=a.getAttribute("href");
  if(!h||h.startsWith("http")||h.startsWith("/portfolio")||a.target==="_blank")return;
  watch(a,h);
});
$("[data-hf]").forEach(function(el){
  watch(el,el.getAttribute("data-hf"));
});
})();
