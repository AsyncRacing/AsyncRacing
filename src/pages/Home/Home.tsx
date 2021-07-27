import React, { useState } from 'react';
import { ChallengeMap } from '../../components/Map/ChallengeMap';
import './Home.css';
import { Track } from '../../model/ChallengeConfiguration';
import { UploadButton } from '../../components/UploadButton/UploadButton';
import { useFileContent } from '../../components/UploadButton/useFileContent';
import { parseGpxData } from '../../model/parser';

interface PropTypes {}

const Home = ({}: PropTypes) => {
  const [file, setFile] = useState<File | null>(null);
  const fileContent = useFileContent(file);

  const tracks: Track[] = [
    {
      name: file?.name ?? 'no track selected',
      path: parseGpxData(fileContent ?? ''),
      color: [0, 0, 255],
    },
  ];
  return (
    <>
      <header>
        <h1>Async Racing</h1>
      </header>
      <section className="home__buttons">
        <UploadButton setFile={setFile} />
      </section>
      <section className="map__area" />
      <ChallengeMap tracks={tracks} />
    </>
  );
};

export { Home };
