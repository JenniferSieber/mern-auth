import { getAuth } from "firebase/auth"; // <-- Import getAuth
import {
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";

export default function Profile() {
  
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log(formData.profilePicture);

  // Get Firebase authentication instance
  const auth = getAuth(app);
  const loggedInUser = auth.currentUser;  // Get the currently logged-in user

  useEffect(() => {
    if (image && loggedInUser) {
      handleFileUpload(image);
    } else if (!loggedInUser) {
      console.error("User is not authenticated! Cannot upload image.");
    }
  }, [image, loggedInUser]);

  const handleFileUpload = async (image) => {
    console.log("Function call", image.name);

    if (!loggedInUser) {
      console.error("User is not authenticated! Cannot upload image.");
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name; // unique
    const storageRef = ref(storage, fileName);
    
    // upload file
    const uploadTask = uploadBytesResumable(storageRef, image);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        console.log(`Upload is ${progress}% complete.`);
      },
      (error) => {
        setImageError(true);
        console.error('Upload error: ', error);
      },
      () => {
        // handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at: ', downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleSubmit = () => {
    console.log("submitted profile form");
  };

  const handleDeleteAccount = () => {
    console.log("delete acct");
  };

  const handleSignOut = () => {
    console.log("sign out");
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser?.profilePicture}
          alt="Profile Avatar Image"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <input
          defaultValue={currentUser?.username}
          type="text"
          placeholder="Username"
          autoComplete="username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser?.email}
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">
        {/* {error && 'Something went wrong!'} */}
        Error
      </p>
      <p className="text-green-700 mt-5">
        {/* {updateSuccess && 'User is updated successfully!'} */}
        Success
      </p>
    </div>
  );
}
