document.querySelectorAll('.card, .card-img').forEach(function(card){
  card.addEventListener('mousemove',function(e){
    var rect=e.currentTarget.getBoundingClientRect();
    var x=e.clientX-rect.left;var y=e.clientY-rect.top;
    card.style.setProperty('--mx',x+'px');
    card.style.setProperty('--my',y+'px');
  });
});

var hero=document.querySelector('.hero-tilt');
if(hero){
  var max=8;
  hero.addEventListener('mousemove',function(e){
    var rect=hero.getBoundingClientRect();
    var x=(e.clientX-rect.left)/rect.width-.5;
    var y=(e.clientY-rect.top)/rect.height-.5;
    hero.style.transform='rotateY('+(x*max)+'deg) rotateX('+(-y*max)+'deg) scale(1.01)';
  });
  hero.addEventListener('mouseleave',function(){
    hero.style.transform='rotateY(0) rotateX(0) scale(1)';
  });
}

var vids=document.querySelectorAll('video.lazy-video');
if(vids.length){
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        var v=en.target;var src=v.getAttribute('data-src');
        if(src && !v.getAttribute('data-loaded')){v.src=src;v.setAttribute('data-loaded','1');v.load();}
        io.unobserve(v);
      }
    });
  },{threshold:0.1});
  vids.forEach(function(v){io.observe(v);});
}

var expCards=document.querySelectorAll('.exp-card');
var expModal=document.getElementById('exp-modal');
if(expCards.length&&expModal){
  var titleEl=expModal.querySelector('#exp-title');
  var contentEl=expModal.querySelector('.exp-content');
  var closeBtn=expModal.querySelector('#exp-close');
  expCards.forEach(function(c){
    c.addEventListener('click',function(){
      var id=c.getAttribute('data-exp');
      var tpl=document.getElementById('exp-'+id);
      if(tpl){
        titleEl.textContent=c.querySelector('img').alt||'Experiência';
        contentEl.innerHTML=tpl.innerHTML;
        expModal.classList.remove('hidden');
      }
    });
  });
  function close(){expModal.classList.add('hidden');}
  closeBtn&&closeBtn.addEventListener('click',close);
  expModal.addEventListener('click',function(e){if(e.target===expModal.querySelector('.absolute'))close();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
}

var projCards=document.querySelectorAll('.proj-card');
var projModal=document.getElementById('proj-modal');
if(projCards.length&&projModal){
  var pTitle=projModal.querySelector('#proj-title');
  var pContent=projModal.querySelector('.proj-content');
  var pCTA=projModal.querySelector('#proj-cta');
  var pClose=projModal.querySelector('#proj-close');
  var pImg=projModal.querySelector('#proj-img');
  projCards.forEach(function(c){
    c.addEventListener('click',function(){
      var id=c.getAttribute('data-proj');
      var tpl=document.getElementById('proj-'+id);
      if(tpl){
        var imgEl = c.querySelector('img');
        pTitle.textContent=imgEl.alt||'Projeto';
        if(pImg) pImg.src = imgEl.src;
        pContent.innerHTML=tpl.innerHTML;
        var link=c.getAttribute('data-link');
        if(link){pCTA.href=link;pCTA.classList.remove('hidden');}
        else {pCTA.href='#';pCTA.classList.add('hidden');}
        projModal.classList.remove('hidden');
      }
    });
  });
  function closeProj(){projModal.classList.add('hidden');}
  pClose&&pClose.addEventListener('click',closeProj);
  projModal.addEventListener('click',function(e){if(e.target===projModal.querySelector('.absolute'))closeProj();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeProj();});
}

var servCards=document.querySelectorAll('.serv-card');
var servModal=document.getElementById('serv-modal');
if(servCards.length&&servModal){
  var sTitle=servModal.querySelector('#serv-title');
  var sContent=servModal.querySelector('.serv-content');
  var sProjetos=servModal.querySelector('#serv-projetos');
  var sOrc=servModal.querySelector('#serv-orcamento');
  var sClose=servModal.querySelector('#serv-close');
  servCards.forEach(function(c){
    c.addEventListener('click',function(){
      var id=c.getAttribute('data-serv');
      var tpl=document.getElementById('serv-'+id);
      if(tpl){
        var title=c.querySelector('.card-left span');
        sTitle.textContent=(title&&title.textContent)||'Serviço';
        sContent.innerHTML=tpl.innerHTML;
        var lp=c.getAttribute('data-link-projetos');
        var lw=c.getAttribute('data-link-whats');
        if(lp){sProjetos.href=lp;sProjetos.classList.remove('hidden');} else {sProjetos.href='#';sProjetos.classList.add('hidden');}
        if(lw){sOrc.href=lw;sOrc.classList.remove('hidden');} else {sOrc.href='#';sOrc.classList.add('hidden');}
        servModal.classList.remove('hidden');
      }
    });
  });
  function closeServ(){servModal.classList.add('hidden');}
  sClose&&sClose.addEventListener('click',closeServ);
  servModal.addEventListener('click',function(e){if(e.target===servModal.querySelector('.absolute'))closeServ();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeServ();});
}

var parallax=document.querySelectorAll('.parallax-bg');
if(parallax.length){
  var lastY=0;
  function onScroll(){
    var y=window.scrollY;
    if(Math.abs(y-lastY)>2){
      parallax.forEach(function(el){
        el.style.transform='translateY('+(-y*0.15)+'px)';
      });
      lastY=y;
    }
  }
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});
}

var formLink=document.querySelector('a[href="#certificacoes"]');
var formTarget=document.getElementById('certificacoes');
if(formLink&&formTarget){
  formLink.addEventListener('click',function(e){
    e.preventDefault();
    formTarget.scrollIntoView({behavior:'smooth',block:'start'});
  });
}
