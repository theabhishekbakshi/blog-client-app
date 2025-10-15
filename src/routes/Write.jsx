
// import { useAuth, useUser } from '@clerk/clerk-react'
// import React, { useState } from 'react'
// import 'react-quill-new/dist/quill.snow.css';
// import ReactQuill from 'react-quill-new';
// import { useMutation } from '@tanstack/react-query'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { IKContext, IKUpload } from 'imagekitio-react';


// const authenticator = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Request failed with status ${response.status}: ${errorText}`);
//             }

//             const data = await response.json();
//             const { signature, expire, token, publicKey } = data;
//             return { signature, expire, token, publicKey };
//         } catch (error) {
//             throw new Error("Authentication request failed");
//         }
//     };

// const Write = () => {
//   const [value, setValue] = useState()
//   const { isLoaded, isSignedIn } = useUser();
//   const {getToken} = useAuth()
//   const navigate = useNavigate()

//   const mutation = useMutation({
//     mutationFn: async (newPost)=>{
//       const token = await getToken()
//       return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//     },
//     onSuccess:(res)=>{
//       toast.success("Post Created Successfully!")
//         navigate(`/${res.data.slug}`)
//     }
//   })

//   if(!isLoaded){
//     return <div>Loading...</div>
//   }
//   if(isLoaded && !isSignedIn){
//     return <div>Please Login to continue!</div>
//   }

//   const handleSubmit = e=>{
//     e.preventDefault()
//     const formData = new FormData(e.target)
//     const data = {
//       title: formData.get("title"),
//       category: formData.get("category"),
//       desc: formData.get("desc"),
//       content: value,
//     }

//     console.log(data)
//     mutation.mutate(data)
//   }

//   return (
//     <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
//       <h1 className='text-xl font-light'>Create a new Post</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
//         {/* <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>Add a cover image</button> */}
//         <IKContext publicKey={import.meta.env.VITE_IK_PUBLIC_KEY} urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} authenticator={authenticator}>
//           <IKUpload fileName="test-upload.png"/>
//         </IKContext>
//         <input className='text-4xl font-semibold outline-none' type="text" placeholder='My Awesome Story' name='title'/>
//         <div className='flex items-center gap-4'>
//            <label className='text-sm' htmlFor="">Choose a category:</label>
//            <select name="category" id="" className='p-2 rounded-xl bg-white shadow-md'>
//               <option value="general">General</option>
//               <option value="web-design">Web Design</option>
//               <option value="development">Development</option>
//               <option value="databases">Databases</option>
//               <option value="seo">Search Engines</option>
//               <option value="marketing">Marketing</option>
//            </select>
//         </div>
//         <textarea className='p-4 rounded-xl bg-white shadow-md' name="desc" placeholder='A Short Description'/>
//         <div className='flex '>
//           <div className='flex flex-col gap-2 mr-2'>
//             <div className='cursor-pointer'>🌅</div>
//             <div className='cursor-pointer'>▶️</div>
//           </div>
//           <ReactQuill className='flex-1 rounded-xl bg-white shadow-md' theme="snow" value={value} onChange={setValue}/>
//         </div>
//         <button disabled={mutation.isPending} className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'>{mutation.isPending ? "Creating..." : "Create Post"}</button>
//         {mutation.isError ? <p className='text-red-500'>{mutation.error.message}</p> : null}
//       </form>

//     </div>
//   )
// }

// export default Write






















import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Upload from '../components/Upload';

// Authenticator for ImageKit — calls your backend

const Write = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState(null); // store uploaded image URL
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState("")
  const [video, setVideo] = useState("")
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    img && setValue(prev=>prev+ `<p><image src="${img}" alt="Image is here"/></p>`)
  }, [img])

  useEffect(() => {
    console.log(video)
    video && setValue(prev=>prev+ `<p><iframe class="ql-video" src="${video}" alt="Image is here"/></p>`)
  }, [video])

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success('Post Created Successfully!');
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (isLoaded && !isSignedIn) return <div>Please Login to continue!</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postData = {
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value,
      img: data || "", // attach uploaded image URL
    };
    mutation.mutate(postData);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a new Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/* Image Upload Section */}
        <Upload type="image" setProgress={setProgress} setData={setData}>
          <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white cursor-pointer">Add a cover Image</button>
        </Upload>

        {/* Preview the uploaded image */}
        {data && (
          <img
            src={data}
            alt="Uploaded Cover"
            className="w-48 h-32 object-cover rounded-xl shadow-md"
          />
        )}

        <input
          className="text-4xl font-semibold outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
          required
        />

        <div className="flex items-center gap-4">
          <label className="text-sm">Choose a category:</label>
          <select
            name="category"
            className="p-2 rounded-xl bg-white shadow-md"
            required
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
          required
        />

        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>🌅</Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>▶️</Upload>
          </div>
          <ReactQuill
            className="flex-1 rounded-xl bg-white shadow-md"
            theme="snow"
            value={value}
            onChange={setValue}
            readOnly={progress > 0 && progress < 100}
          />
        </div>

        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? 'Creating...' : 'Create Post'}
        </button>
        {"Progress: " + progress+"%"}
        {mutation.isError && (
          <p className="text-red-500">{mutation.error.message}</p>
        )}
      </form>
    </div>
  );
};

export default Write;
