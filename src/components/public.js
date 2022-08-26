import React from "react";
import { Link } from "react-router-dom";

const Public = () => (
  <div>
    <ul className="list-unstyled book-links">
      <li>
        <Link to="/theHound">The Hound of Baskerville</Link>
      </li>
      <li>
        <Link to="/theAlchemist">The Alchemist</Link>
      </li>
      <li>
        <Link to="/theHound">Life is What You Make It</Link>
      </li>
      <li>
        <Link to="/theAlchemist">The Prophet</Link>
      </li>
      {/* <li><h3>The Hound of Baskerville</h3></li>
			<li><h3>The Alchemist</h3></li>
			<li><h3>Life is What You Make It</h3></li>
			<li><h3>The Prophet</h3></li> */}
    </ul>
  </div>
);

export default Public;
