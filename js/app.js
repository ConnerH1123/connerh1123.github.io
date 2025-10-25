// app.js — simple dynamic builder for resume site
document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetch('data/resume.json').then(r => r.json()).catch(()=>null);
  if(!data){
    console.warn('Could not load resume.json — using inline defaults.');
  }
  const resume = data || getFallbackResume();

  // Header
  document.getElementById('name').textContent = resume.basics.name;
  document.getElementById('title').textContent = resume.basics.label;
  document.getElementById('summary-text').textContent = resume.basics.summary;
  document.getElementById('profile-photo').src = resume.basics.picture || document.getElementById('profile-photo').src;
  const mailto = `mailto:${resume.basics.email}`;
  document.getElementById('contact-email').href = mailto;
  document.getElementById('mailto-link').href = mailto;
  document.getElementById('download-resume').href = resume.basics.resumePdf || '#';

  // contacts
  const contacts = document.getElementById('contacts');
  contacts.innerHTML = '';
  resume.basics.profiles.forEach(p=>{
    const a = document.createElement('a');
    a.className = 'tag';
    a.href = p.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = p.network;
    contacts.appendChild(a);
  });

  // quick tags
  const tags = document.getElementById('quick-tags');
  resume.basics.keywords.slice(0,6).forEach(k=>{
    const t = document.createElement('span');
    t.className = 'tag';
    t.textContent = k;
    tags.appendChild(t);
  });

  // experience
  const expList = document.getElementById('experience-list');
  resume.work.forEach(job=>{
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `<h3>${job.position} — ${job.company} <span class=\"muted small\">(${job.startDate} — ${job.endDate||'Present'})</span></h3>\n      <p class=\"muted\">${job.location}</p>\n      <p>${job.summary}</p>`;
    expList.appendChild(div);
  });

  // skills
  const skills = document.getElementById('skill-list');
  resume.skills.forEach(s=>{
    const wrap = document.createElement('div');
    wrap.className = 'skill';
    wrap.innerHTML = `<strong>${s.name}</strong>\n      <div class=\"bar\"><i style=\"width:${s.level}%\"></i></div>\n      <p class=\"muted small\">${s.keywords.join(' · ')}</p>`;
    skills.appendChild(wrap);
    // animate bars on load
    requestAnimationFrame(()=> {
      wrap.querySelector('i').style.width = s.level + '%';
    });
  });

  // languages
  const langs = document.getElementById('languages');
  resume.languages.forEach(l=>{
    const p = document.createElement('div');
    p.className = 'muted small';
    p.style.marginBottom = '6px';
    p.textContent = `${l.language} — ${l.fluency}`;
    langs.appendChild(p);
  });

  // projects
  const projects = document.getElementById('project-list');
  resume.projects.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'project';
    el.innerHTML = `<strong>${p.name}</strong>\n      <p class=\"muted small\">${p.description.slice(0,120)}${p.description.length>120?'…':''}</p>\n      <div style=\"margin-top:8px\" class=\"muted small\">${p.keywords.join(' · ')}</div>`;
    el.addEventListener('click', ()=> openProjectModal(p));
    projects.appendChild(el);
  });

  // contact form (demo: opens mailto)
  document.getElementById('contact-send').addEventListener('click', ()=>{
    const name = document.getElementById('contact-name').value||'';
    const email = document.getElementById('contact-email-field').value||'';
    const message = document.getElementById('contact-message').value||'';
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${resume.basics.email}?subject=${encodeURIComponent('Website contact')}&body=${body}`;
  });
  document.getElementById('contact-clear').addEventListener('click', ()=>{
    document.getElementById('contact-name').value='';
    document.getElementById('contact-email-field').value='';
    document.getElementById('contact-message').value='';
  });

  // modal
  const dialog = document.getElementById('project-modal');
  document.getElementById('close-modal').addEventListener('click', ()=> dialog.close());
  function openProjectModal(p){
    const content = document.getElementById('modal-content');
    content.innerHTML = `<h3>${p.name}</h3>\n      <p class=\"muted small\">${p.role || ''} · ${p.startDate || ''}${p.endDate? ' — '+p.endDate:''}</p>\n      <p>${p.description}</p>\n      <p class=\"muted small\">Tech: ${p.keywords.join(', ')}</p>\n      <p class=\"muted small\">Links: ${p.url? `<a href=\"${p.url}\" target=\"_blank\">${p.url}</a>` : '—'}</p>`;
    dialog.showModal();
  }
});

// fallback sample resume if JSON can't be fetched
function getFallbackResume(){
  return {
    basics: {
      name: "Conner Hawkins",
      label: "Product Engineer · Frontend",
      picture: "https://via.placeholder.com/150",
      email: "you@domain.com",
      summary: "Product-focused engineer with experience shipping delightful user experiences and scalable frontend systems.",
      profiles: [
        {network:"GitHub", url:"https://github.com/yourname"},
        {network:"LinkedIn", url:"https://www.linkedin.com/in/yourname"}
      ],
      keywords: ["React", "TypeScript", "Design Systems", "Accessibility", "Performance", "Leadership"],
      resumePdf: "#"
    },
    work: [
      {company:"Acme Inc", position:"Senior Frontend Engineer", startDate:"2022", endDate:"Present", location:"Remote", summary:"Building component systems and leading frontend architecture."},
      {company:"Startup X", position:"Frontend Engineer", startDate:"2019", endDate:"2022", location:"NYC", summary:"Led frontend for mobile-first commerce product."}
    ],
    skills: [
      {name:"Frontend", level:90, keywords:["React","TypeScript","CSS","HTML"]},
      {name:"Design", level:78, keywords:["Figma","Prototyping","Design systems"]},
      {name:"Backend basics", level:62, keywords:["Node","APIs","Databases"]}
    ],
    languages: [
      {language:"English", fluency:"Native"},
      {language:"Spanish", fluency:"Conversational"}
    ],
    projects: [
      {name:"Project Alpha", description:"A responsive web app that helps people track habits and routines, with delightful animations and offline support.", keywords:["PWA","IndexedDB","React"], url:"https://example.com"},
      {name:"Design System", description:"Created a scalable design system used across multiple products, with documentation and automated tests.", keywords:["CSS","Tokens","Accessibility"], url:""}
    ]
  };
}
