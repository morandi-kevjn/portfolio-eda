import { useDispatch, useSelector } from 'react-redux';
import { requestPublish, selectPublish } from './publishSlice';

export default function PublishPanel() {
  const dispatch = useDispatch();
  const { status, steps, errors } = useSelector(selectPublish);
  const busy = status === 'requesting' || status === 'running';
  return (
    <section>
      <h2>Publish</h2>
      <button disabled={busy} onClick={() => dispatch(requestPublish())}>{busy ? 'Publishing…' : 'Publish portfolio'}</button>
      <ol className="timeline">{steps.map((s) => <li key={s.type + s.at}>{s.label}</li>)}</ol>
      {errors.length > 0 && <ul className="errors">{errors.map((e) => <li key={e}>{e}</li>)}</ul>}
    </section>
  );
}
