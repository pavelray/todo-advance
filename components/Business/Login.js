"use client";

import React, { Fragment, useState } from "react";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import useAuthProviersHook from "./AuthProvider/AuthProvider";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const { providers, signIn } = useAuthProviersHook();

  const handleButtonClick = () => {
    // setShowModal(true);
    signIn();
  };
  const hangleModalCloseClick = () => {
    setShowModal(!showModal);
  };
  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center h-full font-mono">
        <h3 className="mb-3 text-2xl text-cyan-50 font-semibold">Welcome</h3>
        <h1 className="mb-10 text-5xl text-cyan-50 font-bold">To-Do</h1>
        <Button text={"Login"} onClick={handleButtonClick} />
      </div>

      <Modal
        title="Sign in to our platform"
        isVisible={showModal}
        onClose={hangleModalCloseClick}
      >
        {providers.map((provider, i) => {
          return (
            <Button
              key={i}
              text={provider[1].name}
              onClick={() =>
                signIn(provider[0], { callbackUrl: "/dashboard" })
              }
            />
          );
        })}
      </Modal>
    </Fragment>
  );
};

export default Login;
