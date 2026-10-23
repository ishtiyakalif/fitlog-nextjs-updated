import Link from 'next/link';
export default function NotFound(){return <section className="not-found container"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>WRONG TURN.</h1><p className="muted">That page isn't part of the workout.</p><Link className="button button-primary" href="/">Back to the library</Link></section>}
