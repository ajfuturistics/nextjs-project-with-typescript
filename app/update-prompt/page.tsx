"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submittimg, setSubmittimg] = useState<boolean>(false);
  const [post, setPost] = useState<PostState>({
    prompt: "",
    tag: "",
  });

  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault();

    if (!promptId) return alert("Prompt ID not found ");

    setSubmittimg(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmittimg(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data?.prompt,
        tag: data?.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submittimg={submittimg}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
