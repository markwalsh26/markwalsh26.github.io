document.getElementById('year').textContent=new Date().getFullYear();
const form=document.getElementById('client-feedback-form');
const status=document.getElementById('form-status');
const submitted=new URLSearchParams(window.location.search).get('submitted')==='true';
if(submitted){
  form.reset();
  status.textContent='Thank you — your feedback was sent privately to Mark and is awaiting review.';
  status.classList.add('form-status-success');
}
form.addEventListener('submit',()=>{
  const button=form.querySelector('button[type="submit"]');
  if(button){button.disabled=true;button.textContent='Sending…';}
  status.textContent='Sending your feedback privately…';
});
