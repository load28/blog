(function(){
var d=document;
function $(s,el){return (el||d).querySelectorAll(s)}

/* header border + progress bar + immersive home parallax */
var hd=d.getElementById("hd"),pb=d.getElementById("pb"),im=d.getElementById("im"),
    hro=d.querySelector(".hro"),cs=$(".stc");
function onScroll(){
  if(hd)hd.classList.toggle("sc",scrollY>10);
  if(pb){
    var t=d.documentElement.scrollHeight-innerHeight;
    pb.style.transform="scaleX("+(t>0?Math.min(1,scrollY/t):0)+")";
  }
  if(im){
    if(hro){
      var p=Math.min(1,Math.max(0,scrollY/(innerHeight*.62)));
      hro.style.opacity=1-p;
      hro.style.transform="translateY("+(-p*46)+"px) scale("+(1-p*.05)+")";
    }
    cs.forEach(function(c,i){
      var nx=cs[i+1];
      if(!nx)return;
      var r=nx.getBoundingClientRect(),
          pr=Math.min(1,Math.max(0,1-(r.top-90)/(innerHeight*.72))),
          w=c.firstElementChild;
      w.style.transform="scale("+(1-pr*.07).toFixed(4)+")";
      w.style.opacity=(1-pr*.65).toFixed(3);
      w.style.filter=pr>.01?"blur("+(pr*2.5).toFixed(2)+"px)":"";
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

/* editorial theme switcher — persists across pages */
var TC={paper:"#fff1e5",ivory:"#faf9f6",journal:"#ffffff"};
function setTheme(t){
  d.documentElement.dataset.theme=t;
  try{localStorage.setItem("th",t)}catch(e){}
  var m=d.querySelector('meta[name=theme-color]');
  if(m&&TC[t])m.setAttribute("content",TC[t]);
  $(".thb").forEach(function(b){b.classList.toggle("on",b.dataset.th===t)});
}
$(".thb").forEach(function(b){
  b.addEventListener("click",function(){setTheme(b.dataset.th)});
});
setTheme(d.documentElement.dataset.theme||"paper");

/* reveal on scroll */
var rv=$(".rv");
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
