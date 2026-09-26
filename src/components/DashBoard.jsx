import { useState, useRef, useEffect } from "react";

export default function Dashboard({ catagories, search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header>
        <button
          className="menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        <div className="header-right">
          <input
            type="text"
            className="search-button"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>
      <nav ref={navRef} className={menuOpen ? "nav-open" : "nav-closed"}>
        {catagories.map((catagory) => (
          <a href="/catagory" key={catagory}>
            {catagory}
          </a>
        ))}
        {catagories.length === 0 && (
          <p className="no-catagory-message">No catagories yet!</p>
        )}
      </nav>
    </>
  );
}
