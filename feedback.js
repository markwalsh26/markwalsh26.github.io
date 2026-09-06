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
  const strengths=data.getAll('What Mark did well');
  const body=[
    'Compass Support Services — Client Feedback','',
    'Rating: '+data.get('Rating')+' / 5',
    'What Mark did well: '+(strengths.length?strengths.join(', '):'Not specified'),'',
    'Feedback / testimonial:',data.get('Review or testimonial'),'',
    'Client name: '+data.get('Client name'),
    'Client email: '+(data.get('email')||'Not provided'),
    'Website permission: '+data.get('Website permission'),'',
    'Approval status: PENDING — do not publish until reviewed and approved by Mark.'
  ].join('\n');
  return 'mailto:markwalsh@hotmail.com.au?subject='+encodeURIComponent('Client feedback awaiting approval — '+data.get('Client name'))+'&body='+encodeURIComponent(body);
}

function prepareApprovalDetails(data){
  const reference='CSS-'+new Date().toISOString().replace(/\D/g,'').slice(0,14);
  const name=data.get('Client name');
  const rating=data.get('Rating');
  const permission=data.get('Website permission');
  const quote=data.get('Review or testimonial');
  const decisionBody=`Review reference: ${reference}\nClient: ${name}\nRating: ${rating}/5\nPermission: ${permission}\n\nReview:\n${quote}`;
  document.getElementById('submission-reference').value=reference;
  document.getElementById('review-summary').value=`${rating}/5 from ${name} — ${permission}`;
  document.getElementById('approve-review').value=`mailto:markwalsh@hotmail.com.au?subject=${encodeURIComponent('APPROVED — '+reference)}&body=${encodeURIComponent(decisionBody+'\n\nDecision: APPROVED. Add this permitted review to approved-testimonials.json and publish.')}`;
  document.getElementById('decline-review').value=`mailto:markwalsh@hotmail.com.au?subject=${encodeURIComponent('DECLINED — '+reference)}&body=${encodeURIComponent(decisionBody+'\n\nDecision: DECLINED. Do not publish this review.')}`;
  return reference;
}

form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!form.reportValidity())return;

  const data=new FormData(form);
  const rating=data.get('Rating');
  if(!window.confirm(`You selected ${rating} out of 5. Is that correct?`))return;
  const reference=prepareApprovalDetails(data);
  data.set('Submission reference',reference);
  data.set('Review summary',document.getElementById('review-summary').value);
  data.set('Approve this review',document.getElementById('approve-review').value);
  data.set('Decline this review',document.getElementById('decline-review').value);
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
