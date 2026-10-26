import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDraft, fieldChanged, projectAdded, projectChanged, projectRemoved } from './portfolioSlice';

// memo: a project row re-renders only when ITS data changes.
const ProjectRow = memo(function ProjectRow({ project, onChange, onRemove }) {
  return (
    <fieldset>
      <input placeholder="Project title" value={project.title} onChange={
          (e) => onChange(project.id, 'title', e.target.value)} />
      <textarea placeholder="What it does" value={project.description} onChange={
          (e) => onChange(project.id, 'description', e.target.value)} />
      <button type="button" onClick={() => onRemove(project.id)}>Remove project</button>
    </fieldset>
  );
});

export default function Editor() {
  const dispatch = useDispatch();
  const draft = useSelector(selectDraft);
  const onProjectChange = useCallback((id, field, value) =>
      dispatch(projectChanged({ id, field, value })), [dispatch]);
  const onRemove = useCallback((id) => dispatch(projectRemoved(id)), [dispatch]);
  const field = (name, placeholder) => (
    <input placeholder={placeholder} value={draft[name]} onChange={(e) =>
        dispatch(fieldChanged({ field: name, value: e.target.value }))} />
  );
  return (
    <section>
      <h2>Edit portfolio</h2>
      {field('name', 'Your name')}
      {field('title', 'Role, e.g. Software engineer')}
      <textarea placeholder="Short bio" value={draft.bio} onChange={(e) =>
          dispatch(fieldChanged({ field: 'bio', value: e.target.value }))} />
      {draft.projects.map((p) => <ProjectRow key={p.id} project={p} onChange={onProjectChange} onRemove={onRemove} />)}
      <button type="button" onClick={() => dispatch(projectAdded())}>Add project</button>
    </section>
  );
}
