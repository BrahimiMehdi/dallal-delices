import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"


export const client = sanityClient({
    projectId:process.env.NEXT_PUBLIC_SANITY_ID,
    dataset:"production",
    apiVersion: '2021-10-21',
    useCdn:false,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)