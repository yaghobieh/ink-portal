import { useState } from 'react';
import { Typography } from '@forgedevstack/bear';
import { InkEditor, INK_SIMPLE_TOOLBAR } from '@forgedevstack/ink';

export const Demos = () => {
  const [full, setFull] = useState('<p>Full toolbar demo</p>');
  const [simple, setSimple] = useState('<p>Simple toolbar</p>');
  const [colors, setColors] = useState(
    '<p>Try <span style="color:#0f766e">colors</span> and highlights.</p>',
  );

  return (
    <div className="fade-in space-y-10">
      <Typography variant="h2" className="text-teal-200">
        Demos
      </Typography>
      <section>
        <Typography variant="h4" className="mb-3">
          Full featured
        </Typography>
        <InkEditor value={full} onChange={setFull} minHeight={180} />
      </section>
      <section>
        <Typography variant="h4" className="mb-3">
          Simple toolbar
        </Typography>
        <InkEditor value={simple} onChange={setSimple} toolbar={INK_SIMPLE_TOOLBAR} />
      </section>
      <section>
        <Typography variant="h4" className="mb-3">
          Colors
        </Typography>
        <InkEditor value={colors} onChange={setColors} />
      </section>
    </div>
  );
};
