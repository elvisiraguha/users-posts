const usersUl = document.querySelector("#users");

const url = "https://jsonplaceholder.typicode.com/users";

const displayPosts = (posts, userId) => {
  const userPostsDiv = document.querySelector(`#user-posts${userId}`);
  const userPostsUl = userPostsDiv.querySelector("ul");

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h4>${post.title}</h4>
    <p>${post.body}</p>
    `;
    userPostsUl.appendChild(li);
  });

  userPostsDiv.classList.remove("hidden");

  const hideBtn = userPostsDiv.querySelector("#hide-posts");
  hideBtn.addEventListener("click", () => {
    userPostsDiv.classList.add("hidden");
  });
};

const handleFetchPosts = () => {
  const getButtons = document.querySelectorAll(".btn-get-posts");
  getButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const userId = btn.getAttribute("id");
      fetch(`${url}/${userId}/posts`)
        .then((res) => res.json())
        .then((posts) => {
          displayPosts(posts, userId);
        })
        .catch((error) => console.log("error while fetching posts: ", error));
    });
  });
};

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data?.map((user) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <div>
      <span>${user.name}</span>
          <span>${user.email}</span>
          <button class="btn-get-posts" id="${user.id}">Get ${user.name}'s Posts</button>
          </div>
          <div class="hidden" id="user-posts${user.id}">
          <ul id="user-posts-ul">
          <li id="hide-posts">Hide</li>
          </ul>
          </div>
          `;
      li.classList.add("user-li");
      li.classList.add("content");
      usersUl.appendChild(li);
    });
    handleFetchPosts();
  })
  .catch((error) => console.log("error while fetching users: ", error));
