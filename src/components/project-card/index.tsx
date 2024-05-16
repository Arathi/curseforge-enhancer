import { useEffect, useState } from "react";
import Mod from "../../domains/mod";
import Category from "../../domains/category";
import File from "../../domains/file";
import dayjs from 'dayjs';
import { formatFileSize, formatNumber } from "../../utils/format";
import SelectDropdown, { SelectDropdownProps } from "../select-dropdown";
import { files } from "../../apis/curseforge-api";

type Props = {
  mod: Mod;
};

const ProjectCard: React.FC<Props> = ({mod}) => {
  const [versionId, setVersionId] = useState<number>(0);
  const [versions, setVersions] = useState<File[]>([]);

  useEffect(() => {
    files(mod.id).then(resp => {
      console.info(`MOD ${mod.id} 版本加载完成，响应如下：`, resp);
      const first = resp.data[0];
      setVersions(resp.data);
      setVersionId(first.id);
    });
  }, []);

  const versionOptions: SelectDropdownProps<number>['options'] = versions.map(version => {
    return {
      value: version.id,
      text: version.fileName,
    };
  });

  const url = `/minecraft/mc-mods/${mod.slug}`;

  const downloads = formatNumber(mod.downloads);
  const updateTime = dayjs.unix(mod.releaseDate).format('YYYY-MM-DD');
  const createTime = dayjs.unix(mod.creationDate).format('YYYY-MM-DD');
  const fileSize = formatFileSize(mod.fileSize);
  const gameVersion = `${mod.gameVersion}`;
  const downloadUrl = `https://www.curseforge.com/api/v1/mods/${mod.id}/files/${versionId}/download`;

  return (
    <div className="project-card">
      <a
        href={url} 
        className="overlay-link" 
        title="Go to Just Enough Items (JEI) Project Page" 
        aria-label="Go to Just Enough Items (JEI) Project Page"
      />
      <div className="art">
        <img
          id="row-image" 
          alt="Just Enough Items (JEI) project avatar" 
          loading="lazy" 
          width="108" 
          height="108" 
          decoding="async" 
          data-nimg="1" 
          style={{
            color: 'transparent'
          }}
          src={mod.avatarUrl}
        />
      </div>
      <a
        className="name" 
        href={url}
        title="Go to Just Enough Items (JEI) Project Page" 
        aria-label="Go to Just Enough Items (JEI) Project Page"
      >
        <span className="ellipsis">{mod.name}</span>
      </a>
      <span className="author">
        <div className="by-author-link">
          By
          <a
            className="author-name"
            href={`/members/${mod.author.name}`}
          >
            <span className="ellipsis">{mod.author.username}</span>
          </a>
        </div>
      </span>
      <div className="actions-container">
        <div className=" split-button">
          <SelectDropdown 
            value={versionId}
            options={versionOptions}
            onChange={version => setVersionId(version)}
          />
          <a className="btn-cta download-cta" href={downloadUrl}>
            <svg className="smaller-icon">
              <use href="/images/sprite.svg#icon-download"></use>
            </svg>
            <span>下载</span>
          </a>
        </div>
      </div>
      <p className="description">{mod.summary}</p>
      <ul className="details-list">
        <li className="detail-downloads">{downloads}</li>
        <li className="detail-updated"><span>{updateTime}</span></li>
        <li className="detail-created"><span>{createTime}</span></li>
        <li className="detail-size">{fileSize}</li>
        <li className="detail-game-version">{gameVersion}</li>
      </ul>
      <Categories mainClass={mod.class} categories={mod.categories} />
    </div>
  );
};

type CategoriesProps = {
  mainClass: Category;
  categories?: Category[];
};
const Categories: React.FC<CategoriesProps> = ({mainClass, categories = []}) => {
  const filters: React.ReactNode[] = [];
  categories.forEach(cat => {
    const description = `Filter by ${cat.name}`;
    filters.push(
      <li>
        <a 
          title={description} 
          aria-label={description} 
          href={cat.url}
        >
          {cat.name}
        </a>
      </li>
    );
  });

  return (
    <ul className="categories">
      <li><a className="class-tag">{mainClass.name}</a></li>
      { filters }
    </ul>
  );
}

export default ProjectCard;
