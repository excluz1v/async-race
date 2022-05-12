import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_author">
        <a
          rel="noreferrer"
          className="github_logo"
          href="https://github.com/excluz1v"
          target="_blank"
        >Github Excluz1v</a>
      </div>
      <a
        rel="noreferrer"
        className="logo"
        href="https://rs.school/"
        target="_blank"
      >
        <img
          className="logo_img"
          src="./images/rs_school.png"
          alt="school logo"
        />
      </a>
    </footer>
  );
}
