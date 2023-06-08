interface Session {
  user: { id: string; username: string; email: string; image: string };
  expires: string;
}

interface Post {
  _id: string;
  creator: {
    _id: string;
    username: string;
    image: string;
    email: string;
  };
  prompt: string;
  tag: string;
}

interface PostState {
  prompt: string;
  tag: string;
}
