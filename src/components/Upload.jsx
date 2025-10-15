
import React, { useRef } from 'react'
import { IKContext, IKUpload } from 'imagekitio-react';
import { toast } from 'react-toastify';

const authenticator = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("Authentication request failed:", error);
    throw new Error("Failed to authenticate upload");
  }
};



const Upload = ({children, type, setProgress, setData}) => {

    const ref = useRef(null)
  return (
    <IKContext
          publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          authenticator={authenticator}
        >
          <IKUpload
            // fileName="cover-image.png"
            useUniqueFileName
            onSuccess={(res) => {
              console.log('Upload success:', res);
              setData(res.url); // save the uploaded image URL
              toast.success('Image uploaded successfully!');
            }}
            onError={(err) => {
              console.error('Upload error:', err);
              toast.error('Image upload failed!');
            }}
            onUploadProgress={(progress)=>{
              console.log(`Upload progress: ${progress}%`)
              setProgress(Math.round((progress.loaded/progress.total)*100))
            }}
            className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white cursor-pointer hidden"
            ref={ref}
            accept={`${type}/*`}
          />
          <div className='cursor-pointer' onClick={()=>ref.current.click()}>
            {children}
          </div>
        </IKContext>
  )
}

export default Upload
