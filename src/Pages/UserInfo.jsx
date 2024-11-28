import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase-config';

const UserInfo = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const postCollectionRef = collection(db, "Allpost");

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
    const getPost = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPost();
  }, []);

  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const postDoc = doc(db, "Allpost", id);
      await deleteDoc(postDoc);
      setPostList(postLists.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 p-8">
      <h1 data-aos="fade-down" className="text-4xl font-bold text-center text-white mb-8">
        User Information
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {postLists.map((post) => (
          <div
            data-aos="fade-up"
            key={post.id}
            className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
              {isAuth && (
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-300"
                >
                  🗑️
                </button>
              )}
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="postTextContainer"><strong>Name:</strong> {post.name}</p>
              <p className="postTextContainer"><strong>Email:</strong> {post.email}</p>
              <p className="postTextContainer"><strong>Age:</strong> {post.age}</p>
              <p className="postTextContainer"><strong>Location:</strong> {post.location}</p>
              <p className="postTextContainer"><strong>Plan:</strong> {post.plan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
