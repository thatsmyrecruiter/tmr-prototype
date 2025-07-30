import Link from 'next/link';
export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>ThatsMyRecruiter</h1>
      <p>Welcome to ThatsMyRecruiter — a platform built to make life easier for travel nurses and healthcare professionals. Create your profile, upload your documents, and share them securely with recruiters.</p>
      <div style={{ marginTop: '1rem' }}>
        <p><Link href="/signup">Sign Up</Link></p>
        <p><Link href="/login">Log In</Link></p>
      </div>
    </div>
  );
}
