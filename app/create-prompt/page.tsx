"use client";

import React, { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

// interface Session {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image: string;
//   };
// }
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submittimg, setSubmittimg] = useState<boolean>(false);
  const [post, setPost] = useState<PostState>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();

    setSubmittimg(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
          userId: session?.user?.id || "",
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittimg(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submittimg={submittimg}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
