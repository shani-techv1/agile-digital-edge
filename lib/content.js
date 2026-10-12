import { getPayloadClient } from "./payload";

export async function findPublishedBySlug(collection, slug) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection,
    depth: 2,
    limit: 1,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
  });
  return result.docs[0] || null;
}

export async function findPublished(collection, where, limit = 100) {
  const payload = await getPayloadClient();
  const filters = [{ _status: { equals: "published" } }];
  if (where) filters.push(where);
  return payload.find({
    collection,
    depth: 1,
    limit,
    sort: "-updatedAt",
    where: { and: filters },
  });
}

export async function readGlobal(slug) {
  try {
    const payload = await getPayloadClient();
    return await payload.findGlobal({ slug });
  } catch (error) {
    console.error(`Unable to read ${slug}`, error);
    return null;
  }
}
