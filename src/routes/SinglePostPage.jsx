import React from "react";
import MyImage from "../components/MyImage";
import { Link } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { format } from "timeago.js";

const fetchPosts = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
  return res.data
}


const SinglePostPage = () => {

  const {slug} = useParams()
  const { isPending, error, data } = useQuery({
      queryKey: ['post', slug],
      queryFn: () => fetchPosts(slug)
  })

  if(isPending) return <div>Loading...</div>
  if(error) return <div>Error fetching data</div>
  if(!data) return <div>No Post Found</div>

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8 ">
        <div className="lg:w-3/5 flex flex-col gap-8 ">
          <h1 className="text-xl md:text-3xl xl:w-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm ">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">
            {data.desc}
          </p>
        </div>
        {data.img && <div className="hidden lg:block w-2/5 m-3">
          <MyImage src={data.img} className="rounded-2xl" />
        </div>}
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-12 ">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            architecto earum suscipit fugit alias repellat ex, ea, doloremque
            non, saepe iure consequuntur aut. Inventore quo praesentium minima
            similique porro nemo. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Non, ullam omnis explicabo quas ratione facilis
            optio esse, maxime tempore error inventore veniam assumenda aliquid,
            rerum delectus. Quaerat magnam excepturi quas! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Doloribus laboriosam quas autem
            iste assumenda architecto quam alias exercitationem at corporis
            ipsum omnis facere inventore est quos, voluptates asperiores placeat
            necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dicta aut pariatur nobis numquam repudiandae maxime nihil
            harum ipsam aperiam perferendis facilis hic, sint qui sequi fugiat
            dolorum ipsum, eveniet exercitationem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            architecto earum suscipit fugit alias repellat ex, ea, doloremque
            non, saepe iure consequuntur aut. Inventore quo praesentium minima
            similique porro nemo. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Non, ullam omnis explicabo quas ratione facilis
            optio esse, maxime tempore error inventore veniam assumenda aliquid,
            rerum delectus. Quaerat magnam excepturi quas! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Doloribus laboriosam quas autem
            iste assumenda architecto quam alias exercitationem at corporis
            ipsum omnis facere inventore est quos, voluptates asperiores placeat
            necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dicta aut pariatur nobis numquam repudiandae maxime nihil
            harum ipsam aperiam perferendis facilis hic, sint qui sequi fugiat
            dolorum ipsum, eveniet exercitationem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            architecto earum suscipit fugit alias repellat ex, ea, doloremque
            non, saepe iure consequuntur aut. Inventore quo praesentium minima
            similique porro nemo. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Non, ullam omnis explicabo quas ratione facilis
            optio esse, maxime tempore error inventore veniam assumenda aliquid,
            rerum delectus. Quaerat magnam excepturi quas! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Doloribus laboriosam quas autem
            iste assumenda architecto quam alias exercitationem at corporis
            ipsum omnis facere inventore est quos, voluptates asperiores placeat
            necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dicta aut pariatur nobis numquam repudiandae maxime nihil
            harum ipsam aperiam perferendis facilis hic, sint qui sequi fugiat
            dolorum ipsum, eveniet exercitationem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            architecto earum suscipit fugit alias repellat ex, ea, doloremque
            non, saepe iure consequuntur aut. Inventore quo praesentium minima
            similique porro nemo. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Non, ullam omnis explicabo quas ratione facilis
            optio esse, maxime tempore error inventore veniam assumenda aliquid,
            rerum delectus. Quaerat magnam excepturi quas! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Doloribus laboriosam quas autem
            iste assumenda architecto quam alias exercitationem at corporis
            ipsum omnis facere inventore est quos, voluptates asperiores placeat
            necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dicta aut pariatur nobis numquam repudiandae maxime nihil
            harum ipsam aperiam perferendis facilis hic, sint qui sequi fugiat
            dolorum ipsum, eveniet exercitationem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            architecto earum suscipit fugit alias repellat ex, ea, doloremque
            non, saepe iure consequuntur aut. Inventore quo praesentium minima
            similique porro nemo. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Non, ullam omnis explicabo quas ratione facilis
            optio esse, maxime tempore error inventore veniam assumenda aliquid,
            rerum delectus. Quaerat magnam excepturi quas! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Doloribus laboriosam quas autem
            iste assumenda architecto quam alias exercitationem at corporis
            ipsum omnis facere inventore est quos, voluptates asperiores placeat
            necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dicta aut pariatur nobis numquam repudiandae maxime nihil
            harum ipsam aperiam perferendis facilis hic, sint qui sequi fugiat
            dolorum ipsum, eveniet exercitationem.
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8 ">
          <h1 className="mb-4 text-sm font-medium ">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8 ">
              {data.user.img && <MyImage
                src={data.user.img || "/avatar.png"}
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />}
              <Link className="text-blue-800 ">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
            <div className="flex gap-2 ">
              <Link>
                <MyImage src="/facebook.svg" />
              </Link>
              <Link>
                <MyImage src="/instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data}/>
          <h1 className="mt-8 mb-4 text-sm font-medium ">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline">All</Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium ">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id}/>
    </div>
  );
};

export default SinglePostPage;
