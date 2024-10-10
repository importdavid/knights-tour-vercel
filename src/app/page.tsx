import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

// import React from 'react';
// import Board from './_components/Board';
// import useClient from 'next/app';

// import BoardForm from './_components/BoardForm';
// import Square from './_components/Square';

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();
}
