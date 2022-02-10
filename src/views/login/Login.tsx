import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "store/AppStore";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  const state = location.state as { from: Location };
  const [signin] = useStore((state) => [state.signin]);
  let [isOpen, setIsOpen] = useState(true);
  let from = state?.from?.pathname || "/";
  console.log("in login");
  function handleSubmit() {
    // event.preventDefault();

    let username = "Ashfaq";

    signin(username);
    navigate(from, { replace: true });
  }
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Overlay />

      <Dialog.Title>Deactivate account</Dialog.Title>
      <Dialog.Description>
        This will permanently deactivate your account
      </Dialog.Description>

      <p>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>

      <button onClick={handleSubmit}>Login</button>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
    </Dialog>
  );
}

export default Login;
