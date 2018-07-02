import React from "react";

const Landing = props => {
  const loginMessage = props.loginMessage ? (
    <div className="alert alert-danger">
      Please sign in to access this function.
    </div>
  ) : null;
  return (
    <div className="row align-items-center">
      <div className="col-6 mx-auto col-md-6 order-md-2">
        <img
          className="img-fluid mb-3 mb-md-0"
          src="https://instagram.fcxh3-1.fna.fbcdn.net/vp/4b780275833dd0800108b35a4def88d1/5BD35739/t51.2885-15/s640x640/e15/29088733_858094154362160_8030385410863529984_n.jpg"
          alt=""
          width="1024"
          height="860"
        />
      </div>
      <div className="col-md-6 order-md-1 text-center text-md-left pr-md-5">
        <h1 className="mb-3 bd-text-purple-bright">Nutrigene</h1>
        <p className="lead text-muted">
          Personalized liquid supplements based on your metabolic data delivered
          to you.
        </p>
        <p className="lead mb-4">
          This customer portal will allow you to make purchases, view your
          orders and track your shipments. Please login on the left to access
          the functions.
        </p>
        {loginMessage}
      </div>
    </div>
  );
};

export default Landing;
