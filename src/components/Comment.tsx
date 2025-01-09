'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';

interface Comment {
    _id: string;
    author: string;
    content: string;
    _createdAt: string;
}

interface CommentsProps {
    postId: string;
}

export default function Comments({ postId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState({
        author: '',
        content: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            const result = await client.fetch(
                `*[_type == "comment" && references($postId)] | order(_createdAt desc)`,
                { postId }
            );
            setComments(result);
        };

        fetchComments();

        const subscription = client.listen(
           ` *[_type == "comment" && references('$postId')]`,
            { postId }
        ).subscribe((update) => {
            if (update.result) {
                fetchComments();
            }
        });

        return () => subscription.unsubscribe();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newComment, postId }),
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error);

            setNewComment({
                author: '',
                content: ''
            });
        } catch (error) {
            console.error('Error submitting comment:', error);
        }

        setIsSubmitting(false);
    };

  return (
//     <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
//       <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Comments</h3>

//       {/* Comment List */}
//       {loading ? (
//         <p className="text-gray-600 dark:text-gray-400">Loading...</p>
//       ) : comments.length > 0 ? (
//         <div className="space-y-4">
//           {comments.map((comment) => (
//             <div key={comment._id} className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
//               <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">{comment.name}</h4>
//               <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
//               <small className="text-sm text-gray-500 dark:text-gray-400">
//                 {new Date(comment._createdAt).toLocaleString()}
//               </small>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
//       )}
// {/* brb */}

//       {/* Comment Form */}
//       <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={newComment.name}
//           onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
//           required
//           className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentDarkPrimary dark:bg-gray-700 dark:text-gray-100"
//         />
//         <textarea
//           placeholder="Your Comment"
//           value={newComment.comment}
//           onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
//           required
//           className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentDarkPrimary dark:bg-gray-700 dark:text-gray-100"
//         ></textarea>
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 py-3 bg-accentDarkPrimary text-white rounded-lg shadow hover:bg-accentDarkSecondary disabled:opacity-50"
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>

  <div className="mt-8 mb-8 border-t border-gray-300 pt-8">
      <h2 className="text-3xl font-bold mb-4">Comments</h2>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
              <input
                  type="text"
                  placeholder="Name"
                  value={newComment.author}
                  onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                  className="w-full p-2 border rounded placeholder:text-gray-400 "
                  required
              />
          </div>
         
          <div>
              <textarea
                  placeholder="Your comment"
                  value={newComment.content}
                  onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  className="w-full p-2 border rounded placeholder:text-gray-400 "
                  rows={4}
                  required
              />
          </div>
          <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-600 disabled:bg-gray-400 dark:bg-[#1f2937] dark:text-white"
          >
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
      </form>

      <div className="space-y-4 p-5 border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-[#1f2937]">
          {comments.map((comment) => (
              <div key={comment._id} className="border p-4 bg-white dark:bg-[#1f2937]">
                  <div className='flex gap-4'>
                      <Image
                      src='/user.svg'
                      alt={comment.author}
                      width={30}
                      height={30}
                      className="rounded-full w-10 h-10 text-white bg-white"
                      />
                      <div>
                          <div className="flex justify-between items-start">
                              <div>
                                  <h3 className="font-semibold text-lg ">{comment.author}</h3>
                                  <p className="text-gray-600 text-sm">
                                      {new Date(comment._createdAt).toLocaleDateString()}
                                  </p>
                              </div>
                          </div>
                          <p className="mt-2">{comment.content}</p>
                      </div>
                  </div>
              </div>
          ))}
          {comments.length === 0 && (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
      </div>
  </div>

  );
};

