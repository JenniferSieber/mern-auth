import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Username"
        />
        <input
          type="email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="c">Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
