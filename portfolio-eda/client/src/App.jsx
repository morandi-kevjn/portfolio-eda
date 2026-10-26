import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPublished } from './features/portfolio/portfolioSlice';
import Editor from './features/portfolio/Editor';
import PublishPanel from './features/publish/PublishPanel';
const Preview = lazy(() => import('./features/portfolio/Preview')); // code splitting

export default function App() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('draft');
  useEffect(() => { dispatch(fetchPublished()); }, [dispatch]);
  return (
    <main>
      <div className="col"><Editor /><PublishPanel /></div>
      <div className="col">
        <nav>
          <button aria-pressed={tab === 'draft'} onClick={() => setTab('draft')}>Draft</button>
          <button aria-pressed={tab === 'published'} onClick={() => setTab('published')}>Live site</button>
        </nav>
        <Suspense fallback={<p>Loading preview…</p>}><Preview source={tab} /></Suspense>
      </div>
    </main>
  );
}
