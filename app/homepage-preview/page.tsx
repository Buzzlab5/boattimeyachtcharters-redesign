import { redirect } from 'next/navigation';

// The preview became the home page. Old links keep working.
export default function HomepagePreviewRedirect() {
  redirect('/');
}
