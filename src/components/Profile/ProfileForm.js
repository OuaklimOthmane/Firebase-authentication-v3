import { useContext, useRef } from "react";
import { API_KEY, HEADERS, URL_UPDATE_PASSWORD } from "../../constants";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const newPassword = newPasswordRef.current.value;

    fetch(`${URL_UPDATE_PASSWORD}${API_KEY}`, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPassword,
        returnSecureToken: false,
      }),
      headers: HEADERS,
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
