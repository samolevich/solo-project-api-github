const middle = (arr) => {
  let actn = '';
  let author = '';
  let authorPage = '';
  let authorEmail = '';
  let repo = '';
  let commitMessage = '';
  let cmt = '';
  let created_at = '';
  let photo = '';
  let fork = '';
  let forkActor = '';
  let newMember = '';

  arr.forEach(event => {
    if (event.type) actn = event.type;
    if (event.actor.login) author = `<p></p>Actor: ${event.actor.login}</p>`;
    if (event.actor.url) authorPage = `${event.actor.url.replace(/api\.github.com\/users\//, 'github.com/')}`;
    if (event.payload.commits && !event.payload.commits[0].author.email.match('noreply')) authorEmail = `<div class="card-action"><a href="mailto:${event.payload.commits[0].author.email}">Email</a></div>`;
    if (event.repo.name) repo = `<p>Repo: ${event.repo.name}</p>`;
    if (event.payload.commits) commitMessage = `${event.payload.commits[0].message}`;
    if (event.payload.commits) cmt = `<div class="card-action"><a href="${event.payload.commits[0].url.replace(/api\./, '')}">Commit</a></div>`;
    if (event.created_at) created_at = `<p>Created at: ${event.created_at.replace(/[TZ]/g, ' ')}</p>`;
    if (event.actor.avatar_url) photo = `${event.actor.avatar_url}`;
    if (event.forkee) fork = `<p>Fork URL: ${event.repo.url.replace(/api\./, '')}</p>`;
    if (event.payload.member) forkActor = `<p>New member: ${event.payload.member.login}</p>`;
    if (event.payload.member) newMember = `<a href="${event.payload.member.html_url}" target="_blank">new member profile</a>`;

    let newCard = document.createElement('div');
    newCard.innerHTML = `
    <div class="col s12 m7">
      <h2 class="header">${event.type}</h2> <h3>${commitMessage}</h3>
        <div class="card horizontal hoverable">
        <div class="card-stacked">
          <div class="card-content">
            ${author}
            ${repo}
            ${created_at}
            ${fork}
            ${forkActor}
            ${newMember}
          </div>
          <div class="card-action">
            <a href="${authorPage}" target="_blank">Profile</a>
          </div>
          ${authorEmail}
          ${cmt}
        </div>
        <div class="card-image">
          <img src="${photo}" style="width: 350px">
        </div>
      </div>
    </div>
    `;
    document.getElementById('content').appendChild(newCard);
    actn = '';
    author = '';
    authorPage = '';
    authorEmail = '';
    repo = '';
    commitMessage = '';
    cmt = '';
    created_at = '';
    photo = '';
    fork = '';
    forkActor = '';
    newMember = '';
  });
}

const main = (string) => {
  fetch(`https://api.github.com/orgs/${string}/events`)
    .then(res => res.json())
    .then(data => middle(data))
    string = '';
}

document.getElementById('org').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('content').innerHTML = '';
  main(event.target[0].value);
})
