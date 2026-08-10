const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.innerHTML='<i class="fa-solid fa-bars"></i>';}));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Only entries deliberately added to approved-testimonials.json can appear publicly.
const testimonialCard=document.getElementById('approved-testimonial');
if(testimonialCard){
  fetch('approved-testimonials.json',{cache:'no-store'})
    .then(response=>{if(!response.ok)throw new Error('Testimonials unavailable');return response.json();})
    .then(testimonials=>{
      const item=Array.isArray(testimonials)?testimonials[0]:null;
      if(!item)return;
      const quote=testimonialCard.querySelector('blockquote');
      const mark=testimonialCard.querySelector('.reviewer-mark');
      const name=testimonialCard.querySelector('strong');
      const details=testimonialCard.querySelector('small');
      if(quote)quote.textContent=`“${item.quote}”`;
      if(mark)mark.textContent=item.initials||'CS';
      if(name)name.textContent=item.name||'Anonymous';
      if(details)details.textContent=item.details||'Approved client feedback';
    })
    .catch(()=>{/* Keep the existing verified testimonial as a safe fallback. */});
}
