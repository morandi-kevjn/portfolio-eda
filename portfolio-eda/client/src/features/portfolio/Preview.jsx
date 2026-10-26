import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectDraft, selectPublished } from './portfolioSlice';
import { useDebouncedValue } from '../../shared/useDebouncedValue';

export default function Preview({ source }) {
  const draft = useDebouncedValue(useSelector(selectDraft));
  const published = useSelector(selectPublished);
  const data = source === 'published' ? published : draft;
  const projects = useMemo(() => (data?.projects ?? []).filter((p) => p.title), [data]);
  if (!data) return <p>Nothing published yet. Fill in the form and publish.</p>;
  return (
    <article>
      <h1>{data.name || 'Your name'}</h1>
      <p><strong>{data.title}</strong></p>
      <p>{data.bio}</p>
      {projects.map((p) => <div key={p.id}><h3>{p.title}</h3><p>{p.description}</p></div>)}
    </article>
  );
}
