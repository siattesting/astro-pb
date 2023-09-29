import PocketBase from 'pocketbase';

const pb = new PocketBase('https://svelteproject.pockethost.io');

export interface Post {
  id: string;
  text: string;
  gist: string;
  tags: string;
}

export async function savePost(
  text: string,
  gist: string,
  tags: string
): Promise<string> {
  return await pb.collection('posts').create({
    text,
    gist,
    tags,
  });
}

export async function getPost(id: string): Promise<Post | null> {
  return await pb.collection('posts').getOne(id);
}

export async function getRecentPost(): Promise<Post | null> {
  const resp = await pb.collection('posts').getList<Post>(0, 1, {
    sort: '-created',
  });
  return resp.items.length > 0 ? resp.items[0] : null;
}

export async function getAllPosts(id: string): Promise<Post[]> {
  return await pb.collection('posts').getFullList({
    sort: '-created',
  });
}
