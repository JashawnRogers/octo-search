
const resultsContainer = document.querySelector('.results-container');
const searchBtn = document.querySelector('.search-btn');

async function getData() {
    // Get user input when function is called rather than the global scope
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) {
         alert(`Please enter a valid GitHub username`);
        return;
    }
    const url = `https://api.github.com/users/${userInput}`;
    try {
        const response = await fetch(url);

        if (!response.ok) { 
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        } // Allows program to immediately exit and handle error 

        const data = await response.json();
        // Convert date from API response 
        const isoString = new Date(data.created_at);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(isoString);

        resultsContainer.innerHTML = `
            <aside>
                <img src="${data.avatar_url}" alt="Github profile picture" class="profile-pic" id="profile-pic">
            </aside>
            <div class="results-data">
                <div class="results-heading">
                    <div class="results-contact">
                        <h2 class="username">${data.name || 'N/A'}</h2>
                        <p class="profile-handle">@${data.login}</p>
                    </div>
                    <div>
                        <p class="join-date">Joined ${formattedDate}</p>
                    </div>
                </div>
                <div class="bio">
                    <textarea name="bio" id="bio" readonly>${data.bio || 'No bio available'}</textarea>
                </div>
                <div class="repos-following">
                    <div class="repos">
                        <h3 class="repos-following-title">Repos</h3>
                        <p id="repo-count" class="numbers">${data.public_repos}</p>
                    </div>
                    <div class="followers">
                        <h3 class="repos-following-title">Followers</h3>
                        <p id="follower-count" class="numbers">${data.followers}</p>
                    </div>
                    <div class="following">
                        <h3 class="repos-following-title">Following</h3>
                        <p id="repo-count" class="numbers">${data.following}</p>
                    </div>
                </div>
                <div class="socials-container">
                    <div class="location-container">
                        <i class="fa-solid fa-location-crosshairs"></i>
                        <p>${data.location || 'N/A'}</p>
                    </div>
                    <div class="twitter-container">
                        <i class="fa-brands fa-twitter"></i>
                        <a href="https://x.com/${data.twitter_username}" target="_blank">@${data.twitter_username || 'N/A'}</a>
                    </div>
                    <div class="link-container">
                        <i class="fa-solid fa-link"></i>
                        <a href="${data.html_url}" target="_blank">${data.html_url}</a>
                    </div>
                    <div class="website-container">
                        <i class="fa-solid fa-link"></i>
                        <a href="https://${data.blog}" target="_blank">${data.blog || 'N/A'}</a>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        // Fetch Error
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p>Something went wrong: ${error.message}</p>`;
    }
}



searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getData();
})