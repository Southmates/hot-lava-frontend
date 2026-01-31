import { sanity } from '@/lib/sanity'

const brandsQuery = `
  *[_type == "brand"] | order(orderRank asc) {
    _id,
    alt,
    image
  }
`

export async function getBrands() {
  const data = await sanity.fetch(brandsQuery)
  return Array.isArray(data) ? data : []
}
