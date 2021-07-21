import React, { useState } from 'react';
import { ChallengeMap } from '../Map/ChallengeMap';
import { UploadButton } from '../UploadButton/UploadButton';
import { useFileContent } from '../UploadButton/useFileContent';
import { parseGpxData } from '../../model/parser';

const GetMapTrack = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileContent = useFileContent(file);
  return (
    <>
      <ChallengeMap
        tracks={[
          {
            name: file?.name ?? 'no track selected',
            path: parseGpxData(fileContent ?? ''),
            color: [0, 0, 255],
          },
        ]}
      />
      <UploadButton setFile={setFile} />
    </>
  );
};

export { GetMapTrack };
