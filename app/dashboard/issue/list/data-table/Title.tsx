import type { Issue } from '@prisma/client';
import React from 'react';

import { capitalize } from '@/lib/utils';

const Title = ({ label, title }: Pick<Issue, 'title' | 'label'>) => {
  return (
    <div className="inline-flex items-center gap-1">
      <span className="rounded-lg border px-2 text-sm font-semibold">
        {capitalize(label)}
      </span>
      {title}
    </div>
  );
};

export default Title;
