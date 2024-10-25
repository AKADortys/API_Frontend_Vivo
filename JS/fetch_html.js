// Charger les fichiers partiels HTML
Promise.all([
    fetch("Partials/newsletter.html").then(response => response.text()),
    fetch("Partials/header.html").then(response => response.text()),
    fetch("Partials/main.html").then(response => response.text()),
    fetch("Partials/footer.html").then(response => response.text())
  ])
  .then(([newsletter, header, main, footer]) => {
    document.getElementById("newslettre").innerHTML = newsletter;
    document.querySelector("header").innerHTML = header;
    document.querySelector("main").innerHTML = main;
    document.querySelector("footer").innerHTML = footer;
    
    // Charger les autres scripts après l'insertion HTML
    loadAdditionalScripts();
  });
  
  function loadAdditionalScripts() {
    const scriptsToLoad = ['JS/header.js', 'JS/newslettre.js','JS/ouverture.js', 'JS/create_user.js'];
  
    scriptsToLoad.forEach(src => {
      setTimeout(() => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
      }, 50);
    });
  }
  