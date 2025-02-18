import { useLoaderData } from 'react-router';
import { type LoaderFunctionArgs } from 'react-router';

import { db } from '~/utils/db.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const [material] = await db.items.findByIds([params.id])

  if (!material) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  return { material }
}

export default function MaterialDetails() {
  const data = useLoaderData<typeof loader>()
  const { material } = data

  return (
    <div className="mx-auto max-w-lg px-4">
      <h1 className="pt-4 pb-2 text-3xl font-bold underline">{material.name}</h1>

      <p className="mt-1 max-w-2xl text-sm text-gray-500">Sources</p>
      <ul>
        {material.source?.map((source) => {
          return <li key={source.name}>{source.name}</li>
        })}
      </ul>
    </div>
  )
}
