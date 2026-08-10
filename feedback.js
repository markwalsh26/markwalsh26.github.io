document.getElementById('year').textContent=new Date().getFullYear();
const form=document.getElementById('client-feedback-form');
const status=document.getElementById('form-status');
form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const strengths=data.getAll('strengths');
  const body=[
    'Compass Support Services — Client Feedback','',
    'Rating: '+data.get('rating')+' / 5',
    'What Mark did well: '+(strengths.length?strengths.join(', '):'Not specified'),'',
    'Feedback / testimonial:',data.get('testimonial'),'','Client name: '+data.get('clientName'),
    'Website permission: '+data.get('permission'),'','Approval status: PENDING — do not publish until reviewed and approved by Mark.'
  ].join('\n');
  const subject='Client feedback — '+data.get('clientName');
  status.textContent='Your email app is opening. Please press Send to deliver your feedback privately.';
  window.location.href='mailto:markwalsh@hotmail.com.au?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});
