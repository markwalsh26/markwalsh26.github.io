const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.innerHTML='<i class="fa-solid fa-bars"></i>';}));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Only entries deliberately added to approved-testimonials.json can appear publicly.
const testimonialList=document.getElementById('approved-testimonials');
if(testimonialList){
  fetch('approved-testimonials.json',{cache:'no-store'})
    .then(response=>{if(!response.ok)throw new Error('Testimonials unavailable');return response.json();})
    .then(testimonials=>{
      if(!Array.isArray(testimonials)||!testimonials.length)return;
      testimonialList.replaceChildren(...testimonials.map(item=>{
        const card=document.createElement('figure');
        card.className='testimonial-card reveal visible';
        const icon=document.createElement('i');
        icon.className='fa-solid fa-quote-left quote-icon';
        icon.setAttribute('aria-hidden','true');
        const quote=document.createElement('blockquote');
        quote.textContent=`“${item.quote}”`;
        const caption=document.createElement('figcaption');
        const mark=document.createElement('span');
        mark.className='reviewer-mark';
        mark.setAttribute('aria-hidden','true');
        mark.textContent=item.initials||'CS';
        const attribution=document.createElement('span');
        const name=document.createElement('strong');
        name.textContent=item.name||'Anonymous';
        const details=document.createElement('small');
        details.textContent=item.details||'Approved client feedback';
        attribution.append(name,details);
        caption.append(mark,attribution);
        card.append(icon,quote,caption);
        return card;
      }));
    })
    .catch(()=>{/* Keep the existing verified testimonial as a safe fallback. */});
}
