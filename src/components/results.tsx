import { useEffect, useState } from 'react';
import ProjectCard from './project-card';
import { search } from '../apis/curseforge-api';
import Mod from '../domains/mod';

const Results = () => {
  const [results, setResults] = useState<Mod[]>([]);
  
  useEffect(() => {
    const params = {
      gameId: 432,
      classId: 6,
      index: 0,
      pageSize: 20,
      sortField: 1,
    };

    console.info(`开始搜索MOD：`, params);
    search(params).then(resp => {
      console.info(`MOD搜索完成，响应报文如下：`, resp);
      setResults(resp.data);
    });
  }, []);

  const cards = results.map(mod => <ProjectCard mod={mod} />);
  return (
    <>
      { cards }
    </>
  );
};

export default Results;
