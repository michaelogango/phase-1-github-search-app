document.getElementById('github-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const searchInput = document.getElementById('search').value;
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    userList.innerHTML = ''; // Clear previous user results
    reposList.innerHTML = ''; // Clear previous repo results
  
    const searchResponse = await fetch(`https://api.github.com/search/users?q=${searchInput}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
  
    const searchData = await searchResponse.json();
  
    searchData.items.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'user-container';
  
      const userImage = document.createElement('img');
      userImage.src = user.avatar_url;
      userImage.alt = `${user.login}'s avatar`;
      userImage.width = 50;
      userImage.height = 50;
  
      const userLink = document.createElement('a');
      userLink.href = '#';
      userLink.textContent = user.login;
      userLink.addEventListener('click', async function() {
        await showUserRepos(user.login);
      });
  
      userDiv.appendChild(userImage);
      userDiv.appendChild(userLink);
      userList.appendChild(userDiv);
    });
  });
  
  async function showUserRepos(username) {
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
  
    const reposData = await reposResponse.json();
  
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous repo results
  
    reposData.forEach(repo => {
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.textContent = repo.name;
      repoLink.target = '_blank';
      reposList.appendChild(repoLink);
      reposList.appendChild(document.createElement('br'));
    });
  }
  