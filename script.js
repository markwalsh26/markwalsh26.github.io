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
    'gym-fitness.html':['images/more-than-everyday-help-v2.png','A wheelchair user enjoying a supported gym session'],
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

  const heroCopy=serviceHero.querySelector('.service-detail-hero-inner');
  const serviceNav=document.querySelector('.nav-links');
  if(serviceNav&&!serviceNav.querySelector('a[href="aged-care-support.html"]')){
    const agedCareLink=document.createElement('a');
    agedCareLink.href='aged-care-support.html';agedCareLink.textContent='Aged Care';
    serviceNav.querySelector('.nav-cta')?.before(agedCareLink);
  }
  const audienceTags=document.createElement('div');
  audienceTags.className='service-audience-tags';
  audienceTags.innerHTML='<span><i class="fa-solid fa-wheelchair" aria-hidden="true"></i> NDIS</span><span><i class="fa-solid fa-person-cane" aria-hidden="true"></i> Aged care</span><span><i class="fa-solid fa-user" aria-hidden="true"></i> Private support</span>';
  heroCopy?.querySelector('.eyebrow')?.after(audienceTags);

  const fundingCopy={
    'community-participation.html':['Social and community participation support may be available when it relates to your disability, goals and plan.','Social support and community engagement may be available when included in your aged-care assessment and service plan.'],
    'virtual-putting.html':['Funding may cover the extra disability-related support needed to participate; ordinary entry and activity costs are generally personal expenses.','Accompanied social or community activities may be available through your approved aged-care services; venue and activity costs are generally paid separately.'],
    'transport-appointments.html':['Transport or support-worker assistance depends on your plan, the purpose of the trip and the support delivered.','Assessed transport services may help with appointments, shopping and community activities through Support at Home or CHSP.'],
    'home-shopping-daily-living.html':['Core supports may include assistance with daily life when it relates to disability needs and your plan.','Domestic assistance and help with shopping or everyday tasks may be available when included in your aged-care assessment and service plan.'],
    'gym-fitness.html':['Disability-related support to participate may be available when it meets the funding criteria; gym fees and ordinary training costs may remain personal expenses.','Support to stay active may be arranged around assessed needs and goals; confirm whether assistance or personal training is approved or privately paid.'],
    'ndis-home-cleaning.html':['Assistance with daily life may include essential household cleaning when the need relates to disability and the support is permitted by your plan.','Essential light cleaning and laundry may be available as domestic assistance through Support at Home or CHSP when approved in your assessment.'],
    'ndis-car-washing.html':['Car washing is not automatically funded. Confirm that the requested assistance is disability-related, permitted by your plan and not an ordinary vehicle cost.','Vehicle running costs are generally personal expenses. Ask your aged-care provider or care partner whether any practical assistance can be included or must be privately paid.'],
    'holiday-travel.html':['Funding may cover agreed disability-related support during an activity or trip, while accommodation, food, tickets and ordinary travel costs are generally personal expenses.','Assistance for local outings may be available, but holiday travel and ordinary holiday costs are generally not funded aged-care services. Confirm arrangements before booking.'],
    'social-outings.html':['Funding may cover the extra disability-related support needed to participate; ordinary meals, tickets and membership costs are generally paid by you.','Individual social support, accompanied activities and community engagement may be available through assessed aged-care services.'],
    'technology-digital-skills.html':['Digital-skills support may be relevant when it relates to disability needs, independence goals and an available support category.','Digital education and support can form part of approved social support and community engagement services.'],
    'admin-planning.html':['Practical assistance must relate to disability support needs, goals and the supports available in your plan.','Some assistance to maintain personal affairs may be available within approved social support; professional financial or legal advice is not included.']
  };
  const funding=serviceHero.parentElement?.querySelector('.service-funding');
  const copy=fundingCopy[page];
  if(funding&&copy){
    funding.innerHTML=`<h3>Three ways to access support</h3><div class="support-pathways"><article><span>NDIS</span><p>${copy[0]}</p><a href="https://www.ndis.gov.au/participants/using-your-funding/understanding-your-ndis-funding/guide-using-your-funding">NDIS funding guide <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></article><article><span>Aged care</span><p>${copy[1]} Your available budget and any contribution depend on your individual arrangements.</p><a href="https://www.myagedcare.gov.au/aged-care-services">My Aged Care services <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></article><article><span>Private support</span><p>You can book and pay Compass directly. You do not need an NDIS plan or aged-care funding, and we will agree the service and price with you before it begins.</p><a href="index.html#contact">Ask about private support <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a></article></div><p class="service-disclaimer">Funding and fees depend on your individual plan, assessment, approved services, budget and circumstances. Compass cannot approve funding or guarantee reimbursement. We can help you describe the service clearly before you confirm it with your plan manager, support coordinator, care partner or provider.</p>`;
  }
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
