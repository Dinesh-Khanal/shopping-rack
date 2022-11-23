import axios from 'axios';
import React, { FormEvent, useState } from 'react';

const UserRegister = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [avatar, setAvatar] = useState<string>('/profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    if (target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result as string);
          setAvatar(reader.result as string);
        }
      };
      if (target.files !== null) {
        reader.readAsDataURL(target.files[0]);
      }
    } else {
      setUser({ ...user, [target.name]: target.value });
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', user.name);
    myForm.set('email', user.email);
    myForm.set('password', user.password);
    myForm.set('avatar', avatar);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post(`/api/v1/register`, myForm, config);
    console.log(data);
    setUser({
      name: '',
      email: '',
      password: '',
    });
    setAvatar('/profile.png');
    setAvatarPreview('/Profile.png');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" onChange={handleChange} />
        </div>
        <div>
          <img src={avatarPreview} alt="Avatar Preview" width="100 px" />
          <br />
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
