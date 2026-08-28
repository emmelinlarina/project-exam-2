export function renderHeader() {
  const header = document.getElementById("header");
  header.innerHTML = `
    <nav aria-label="Main navigation">
      <a href="/" aria-label="Holidaze home">Holidaze
      </a>

      <div>
        <a href="#venue-list">Venues</a>
        <a href="./login">Login</a>
        <a href="./register">Register</a>
      </div>
    </nav>
  `;
}
