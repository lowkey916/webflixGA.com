const DATA = [
  {id:1,title:'Gladiator NEW 2B - ROCKY',category:'Action',thumb:'https://picsum.photos/id/1011/600/400',desc:'Gladiator sequel — Kinyarwanda dubbed.',video:'https://www.w3schools.com/html/mov_bbb.mp4'},
  {id:2,title:'Bad Influencer Ep2',category:'Drama',thumb:'https://picsum.photos/id/1015/600/400',desc:'A drama about fame and consequences.',video:'https://www.w3schools.com/html/mov_bbb.mp4'},
  {id:3,title:'Money Heist Korea Ep1',category:'Drama',thumb:'https://picsum.photos/id/1021/600/400',desc:'Heist series dubbed into Kinyarwanda.',video:'https://www.w3schools.com/html/mov_bbb.mp4'},
  {id:4,title:'Baaghi 4 - ROCKY',category:'Indian',thumb:'https://picsum.photos/id/1012/600/400',desc:'Action-packed Indian film dubbed.',video:'https://www.w3schools.com/html/mov_bbb.mp4'},
  {id:5,title:'The Flash',category:'Sci-Fi',thumb:'https://picsum.photos/id/1003/600/400',desc:'Superhero blockbuster in Kinyarwanda.',video:'https://www.w3schools.com/html/mov_bbb.mp4'}
];

const categoriesEl = document.getElementById('categories');
const grid = document.getElementById('grid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const playerArea = document.getElementById('playerArea');
const playerTitle = document.getElementById('playerTitle');
const playerDesc = document.getElementById('playerDesc');
const closeBtn = document.getElementById('closeBtn');

const cats = ['All', ...new Set(DATA.map(d=>d.category))];
let activeCat = 'All';
cats.forEach(c=>{
  const el = document.createElement('div');
  el.className='chip'+(c==='All'?' active':'');
  el.innerText=c;
  el.onclick = ()=>{
    document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
    el.classList.add('active');
    activeCat = c;
    renderGrid();
  }
  categoriesEl.appendChild(el);
});

function renderGrid(){
  const q = searchInput.value.trim().toLowerCase();
  grid.innerHTML='';
  const filtered = DATA.filter(d=>{
    if(activeCat!=='All' && d.category!==activeCat) return false;
    if(q && !(d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q))) return false;
    return true;
  });

  if(filtered.length===0){
    grid.innerHTML = '<div style="color:var(--muted);padding:24px">No results — try another search</div>';
    return;
  }

  filtered.forEach(movie=>{
    const c = document.createElement('article'); c.className='card';
    c.innerHTML = `
      <div class="thumb" style="background-image:url(${movie.thumb})"></div>
      <div class="meta">
        <h3>${movie.title}</h3>
        <p>${movie.category} • ${movie.desc.slice(0,60)}…</p>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button data-id="${movie.id}" class="playBtn">Play</button>
          <a href="#" class="more">Details</a>
        </div>
      </div>
    `;
    grid.appendChild(c);
  });

  document.querySelectorAll('.playBtn').forEach(btn=>{
    btn.onclick = ()=>{ const id = Number(btn.dataset.id); openPlayer(id); }
  });
}

function openPlayer(id){
  const m = DATA.find(x=>x.id===id);
  if(!m) return;
  playerTitle.innerText = m.title;
  playerDesc.innerText = m.desc;
  playerArea.innerHTML = `<video controls playsinline src="${m.video}"></video>`;
  modal.classList.add('open');
}

closeBtn.onclick = ()=>{ modal.classList.remove('open'); playerArea.innerHTML=''; }
modal.onclick = (e)=>{ if(e.target===modal) closeBtn.click(); }

searchInput.addEventListener('input', renderGrid);
renderGrid();
