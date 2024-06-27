document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('user-form');
    const input = document.getElementById('username');
    const profileContainer = document.getElementById('profile-container');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      fetchProfile(input.value);
    });
  
    function fetchProfile(username) {
      if (!username) {
        alert('Enter a GitHub username');
        return;
      }
  
      fetch(`https://api.github.com/users/${username}`)
        .then(response => {
          if (response.status === 404) {
            throw new Error('User not found');
          }
          if (!response.ok) {
            throw new Error('Network response is not ok');
          }
          return response.json();
        })
        .then(data => {
          displayProfile(data);
        })
        .catch(err => {
          displayError(err.message);
        });
    }
  
    function displayProfile(profileData) {
      profileContainer.innerHTML = `
        <div class="flex items-center mb-4">
          <span class="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full mr-4">
            <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
              <img src="${profileData.avatar_url}" alt="${profileData.login}">
            </span>
          </span>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">${profileData.name || profileData.login}</h2>
            <p class="text-gray-600 dark:text-gray-400">@${profileData.login}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 dark:text-gray-400 mr-2">
              <path d="m7.5 4.27 9 5.15"></path>
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
              <path d="m3.3 7 8.7 5 8.7-5"></path>
              <path d="M12 22V12"></path>
            </svg>
            <span class="text-gray-900 dark:text-gray-100">${profileData.public_repos}</span>
            <span class="text-gray-600 dark:text-gray-400 ml-1">Repos</span>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 dark:text-gray-400 mr-2">
              <line x1="8" x2="21" y1="6" y2="6"></line>
              <line x1="8" x2="21" y1="12" y2="12"></line>
              <line x1="8" x2="21" y1="18" y2="18"></line>
              <line x1="3" x2="3.01" y1="6" y2="6"></line>
              <line x1="3" x2="3.01" y1="12" y2="12"></line>
              <line x1="3" x2="3.01" y1="18" y2="18"></line>
            </svg>
            <span class="text-gray-900 dark:text-gray-100">${profileData.public_gists}</span>
            <span class="text-gray-600 dark:text-gray-400 ml-1">Gists</span>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 dark:text-gray-400 mr-2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span class="text-gray-900 dark:text-gray-100">${profileData.followers}</span>
            <span class="text-gray-600 dark:text-gray-400 ml-1">Followers</span>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 dark:text-gray-400 mr-2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span class="text-gray-900 dark:text-gray-100">${profileData.following}</span>
            <span class="text-gray-600 dark:text-gray-400 ml-1">Following</span>
          </div>
        </div>
        <div class="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span>Joined on ${new Date(profileData.created_at).toLocaleDateString()}</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Last updated ${new Date(profileData.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      `;
      profileContainer.classList.remove('hidden');
    }
  
    function displayError(errorMessage) {
      profileContainer.innerHTML = `
        <div class="text-red-500 font-bold">
          ${errorMessage}
        </div>
      `;
      profileContainer.classList.remove('hidden');
    }
  });
  