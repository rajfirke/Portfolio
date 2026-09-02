function renderProjects(projectList) {
  const container = document.querySelector(".products-area");
  if (!container) return;

  container.textContent = "";

  projectList.forEach((project) => {
    const card = document.createElement("div");
    card.classList.add("product-item");

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = `Image for ${project.title}`;
    img.loading = "lazy";

    const details = document.createElement("div");
    details.classList.add("product-details");

    const title = document.createElement("h3");
    title.classList.add("product-title");
    title.textContent = project.title;

    const skills = document.createElement("p");
    skills.classList.add("product-author");
    skills.textContent = `Skills: ${project.skills}`;

    const description = document.createElement("p");
    description.classList.add("price-title");
    description.textContent = project.description;
    description.style.display = "none";

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("desc-button");
    toggleBtn.textContent = "See Description";
    toggleBtn.addEventListener("click", () => {
      const isHidden = description.style.display === "none";
      description.style.display = isHidden ? "block" : "none";
      skills.style.display = isHidden ? "none" : "block";
    });

    const githubLink = document.createElement("a");
    githubLink.classList.add("product-link-button");
    githubLink.textContent = "Github Link";
    githubLink.href = project.link;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";

    details.append(title, skills, description, toggleBtn, githubLink);
    card.append(img, details);
    container.append(card);
  });
}

function initProjects() {
  const mlProjects = PROJECTS.filter((p) => p.category === "ML");
  const sdProjects = PROJECTS.filter((p) => p.category === "SD");

  renderProjects(PROJECTS);

  const allCount = document.querySelector(".products-filter label[for=all] .product-amount");
  const sdCount = document.querySelector(".products-filter label[for=paid] .product-amount");
  const mlCount = document.querySelector(".products-filter label[for=free] .product-amount");

  if (allCount) allCount.textContent = PROJECTS.length;
  if (sdCount) sdCount.textContent = sdProjects.length;
  if (mlCount) mlCount.textContent = mlProjects.length;

  document.querySelector(".products-filter")?.addEventListener("click", (e) => {
    const { id } = e.target;
    if (id === "all") renderProjects(PROJECTS);
    else if (id === "paid") renderProjects(sdProjects);
    else if (id === "free") renderProjects(mlProjects);
  });
}
