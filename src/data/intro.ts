import { sanity } from '@/lib/sanity'

const query = `
*[_type == "introSection"][0]{
  section1,
  section2{ title{ line1, line2 }, paragraph },
  section3{ title{ line1, line2 }, paragraph },
  section4{ title{ line1, line2 }, paragraph }
}
`

export function getIntro() {
  return sanity.fetch(query)
}
