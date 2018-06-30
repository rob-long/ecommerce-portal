import React from "react";

const Landing = () => {
  return (
    <div class="row align-items-center">
      <div class="col-6 mx-auto col-md-6 order-md-2">
        <img
          class="img-fluid mb-3 mb-md-0"
          src="https://instagram.fcxh3-1.fna.fbcdn.net/vp/4b780275833dd0800108b35a4def88d1/5BD35739/t51.2885-15/s640x640/e15/29088733_858094154362160_8030385410863529984_n.jpg"
          alt=""
          width="1024"
          height="860"
        />
      </div>
      <div class="col-md-6 order-md-1 text-center text-md-left pr-md-5">
        <h1 class="mb-3 bd-text-purple-bright">Nutrigene</h1>
        <p class="lead text-muted">
          Personalized liquid supplements based on your metabolic data delivered
          to you.
        </p>
        <p class="lead mb-4">
          This customer portal will allow you to make purchases, view your
          orders and track your shipments. Please login on the left to access
          the functions.
        </p>
      </div>
    </div>
  );
};

export default Landing;
