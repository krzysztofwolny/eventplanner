import React, {useState} from "react";
import Link from "next/link";
import { auth, generateUserDocument, signInWithGoogle } from '../../src/firebase';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, {displayName});
            console.log('założyłeś konto!');
          }
          catch(error){
            setError('Error Signing up with email and password');
            console.log('nie masz konta!');
          }

        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
          setEmail(value);
        } else if (name === "userPassword") {
          setPassword(value);
        } else if (name === "displayName") {
          setDisplayName(value);
        }
      };

    return(
        <div>
            <h1>Sign Up</h1>
            <div>
                {error !== null && (
                    <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                    {error}
                    </div>
                )}
            <form>
                <label htmlFor="displayName">
                    Display Name:
                </label>
                 <input
                    type="text"
                    name="displayName"
                    value={displayName}
                    placeholder="E.g: Faruq"
                    id="displayName"
                    onChange={event => onChangeHandler(event)}
                />
                <label htmlFor="userEmail" className="block">
                    Email:
                </label>
                <input
                    type="email"
                    name="userEmail"
                    value={email}
                    placeholder="E.g: faruq123@gmail.com"
                    id="userEmail"
                    onChange={event => onChangeHandler(event)}
                />
                <label htmlFor="userPassword">
                    Password:
                 </label>
                <input
                    type="password"
                    name="userPassword"
                    value={password}
                    placeholder="Your Password"
                    id="userPassword"
                    onChange={event => onChangeHandler(event)}
                />
                <button
                    onClick={event => {
                    createUserWithEmailAndPasswordHandler(event, email, password);
                    }}>
                    Sign up
                </button>
            </form>
            <p>or</p>
            <button  onClick={() => signInWithGoogle()}>
                Sign In with Google
            </button>
            <p>
                Already have an account?{" "}
            <Link href="/SignIn">
                 Sign in here
            </Link>
        </p>
      </div>
    </div>
    );
}

export default SignUp