## tab icon / favicon

- Just place .png file in app folder and name it icon.png

## Google fonts usage:

- https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/43783724#questions/21898766

## Images

- import images via import, then next.js can analyze them
- to do not use width and height use fill attribute
- images are converted by next.js when used <Image />
- flex-1, relative, object-cover
-      ```
      <div className="flex-1 relative">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className=" object-cover flex-1 border-r border-primary-800"
        />
      </div>
      ```

## ENV.LOCALE

## ONLY FOR SERVER ACCESS

SUPABASE_URL= #project URL https://supabase.com/dashboard/project/bxmaltcawkcfynthgfkk/settings/api
SUPABASE_KEY= #secret key https://supabase.com/dashboard/project/bxmaltcawkcfynthgfkk/settings/api-keys

##CLIENT ACCESS ALSO - NEXT*PUBLIC*<var_name>

# AUTHENTICATION

Docs: https://authjs.dev/getting-started/installation?framework=Next.js
Google providors: https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/43783846#questions/22528913

NEXTAUTH_URL= http://localhost:3000
NEXTAUTH_SECRET=generate key from https://secretkeygen.vercel.app/
AUTH_GOOGLE_ID= https://console.cloud.google.com/auth/clients/
AUTH_GOOGLE_SECRET= https://console.cloud.google.com/auth/clients/

## MetaData:

// export const metadata = {
// title: 'Cabin',
// };

//Build in nextJs method for dynamic metaData
export async function generateMetadata({ params }) {
const { cabinId } = await params;
const cabin = await getCabin(cabinId);

return {
title: `Cabin ${cabin.name}`,
};
}

## Project structure:

https://nextjs.org/docs/app/getting-started/project-structure

## Error handling

- create error.js file
- 'use client'; //error js always have to be client component
- does not catch errors from root layout
- every route can have own error layout handler, just put it in given folder

## Static vs Dynamic Rendering:

- https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/43783776#questions

## Making Dynamic Pages Static

- https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/43783780#questions

## Static Site Generation

- https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/43783782#questions

## Cache page:

- Do not cache this page at all, always render it fresh on every request
- export const revalidate = 0;
- values are seconds, refetch at least one per (revalidate = 60) minute

## Connection - render page after data is fetched

- https://nextjs.org/docs/app/api-reference/functions/connection
- The connection() function allows you to indicate rendering should wait for an incoming user request before continuing.
