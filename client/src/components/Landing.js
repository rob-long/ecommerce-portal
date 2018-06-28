import React from "react";

const Landing = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sendy!</h1>
      <p>Easily send questionnaires to your clients!</p>
      <div>
        <form>
          <input type="text" />
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Landing;
