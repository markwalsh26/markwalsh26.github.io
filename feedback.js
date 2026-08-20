document.getElementById('year').textContent=new Date().getFullYear();
const form=document.getElementById('client-feedback-form');
const status=document.getElementById('form-status');
const button=form.querySelector('button[type="submit"]');
const originalButtonHtml=button?button.innerHTML:'';

function setSubmitting(isSubmitting){
  if(!button)return;
  button.disabled=isSubmitting;
  button.innerHTML=isSubmitting?'Sending…':originalButtonHtml;
}

function emailFallback(data){
  const strengths=data.getAll('strengths');
  const body=[
    'Compass Support Services — Client Feedback','',
    'Rating: '+data.get('rating')+' / 5',
    'What Mark did well: '+(strengths.length?strengths.join(', '):'Not specified'),'',
    'Feedback / testimonial:',data.get('testimonial'),'',
    'Client name: '+data.get('clientName'),
    'Client email: '+(data.get('email')||'Not provided'),
    'Website permission: '+data.get('permission'),'',
    'Approval status: PENDING — do not publish until reviewed and approved by Mark.'
  ].join('\n');
  return 'mailto:markwalsh@hotmail.com.au?subject='+encodeURIComponent('Client feedback awaiting approval — '+data.get('clientName'))+'&body='+encodeURIComponent(body);
}

form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!form.reportValidity())return;

  const data=new FormData(form);
  setSubmitting(true);
  status.classList.remove('form-status-success');
  status.textContent='Sending your feedback privately…';

  try{
    const response=await fetch('https://formsubmit.co/ajax/markwalsh@hotmail.com.au',{
      method:'POST',
      headers:{Accept:'application/json'},
      body:data
    });
    const result=await response.json().catch(()=>({}));
    if(!response.ok||result.success===false)throw new Error(result.message||'Delivery failed');

    form.reset();
    status.textContent='Thank you — your feedback was emailed privately to Mark and is awaiting review.';
    status.classList.add('form-status-success');
  }catch(error){
    const link=document.createElement('a');
    link.href=emailFallback(data);
    link.textContent='open your email app to send it directly to Mark';
    status.replaceChildren('The form service could not send your feedback. Please ',link,'. Nothing has been published.');
  }finally{
    setSubmitting(false);
  }
});
