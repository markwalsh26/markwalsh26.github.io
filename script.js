const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.innerHTML='<i class="fa-solid fa-bars"></i>';}));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Compact values: hover/focus on desktop, tap to expand on touch devices.
document.querySelectorAll('.value-toggle').forEach(toggle=>toggle.addEventListener('click',()=>{
  const item=toggle.closest('.value-item');
  const panel=item?.closest('.values-panel');
  const opening=!item.classList.contains('is-open');
  panel?.querySelectorAll('.value-item.is-open').forEach(openItem=>{
    openItem.classList.remove('is-open');
    openItem.querySelector('.value-toggle')?.setAttribute('aria-expanded','false');
  });
  item?.classList.toggle('is-open',opening);
  toggle.setAttribute('aria-expanded',String(opening));
}));

// Photo-led service pages: choose the most relevant local image for each service.
const serviceHero=document.querySelector('.service-detail-hero');
if(serviceHero){
  const page=location.pathname.split('/').pop()||'index.html';
  const heroImages={
    'community-participation.html':['images/community-hero-inclusive.jpg','People of different ages and abilities enjoying time together in the community'],
    'virtual-putting.html':['images/virtual-putting-hero.png','A wheelchair user enjoying virtual putting with a support worker'],
    'transport-appointments.html':['images/ndis-services.jpg','Support with transport, appointments and community activities'],
    'home-shopping-daily-living.html':['images/aged-care-services.jpg','Friendly support with shopping, daily routines and life at home'],
    'gym-fitness.html':['images/more-than-everyday-help-v4.png','Mark supporting a wheelchair user during a gym session'],
    'ndis-home-cleaning.html':['images/home-cleaning-support-hero.png','A participant and support worker completing home cleaning together'],
    'ndis-car-washing.html':['images/car-washing-support-hero.png','A participant and support worker washing a personal car together'],
    'holiday-travel.html':['images/hero-banner-full-scene.jpg','A wheelchair user enjoying a supported coastal outing'],
    'social-outings.html':['images/community-hero-inclusive.jpg','A diverse group enjoying a relaxed social outing together'],
    'technology-digital-skills.html':['images/aged-care-services.jpg','Patient support with technology and everyday skills'],
    'admin-planning.html':['images/ndis-services.jpg','Practical support with planning and everyday goals']
  };
  const selected=heroImages[page];
  if(selected){
    const image=document.createElement('img');
    image.className='service-detail-hero-image';image.src=selected[0];image.alt=selected[1];
    serviceHero.prepend(image);
  }
  document.querySelectorAll('.service-idea').forEach(card=>card.addEventListener('pointermove',event=>{
    const box=card.getBoundingClientRect();
    card.style.setProperty('--pointer-x',`${event.clientX-box.left}px`);
    card.style.setProperty('--pointer-y',`${event.clientY-box.top}px`);
  }));
}

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
