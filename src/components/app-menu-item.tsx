import { useEffect } from "react";

const AppMenuItem = () => {
  useEffect(() => {
    console.info(`插件设置按钮已加载`);
  }, []);

  return (
    <>
      <a className={'link-btn btn-lined link-btn-icon'} href='#'>插件设置</a>
    </>
  );
};

export default AppMenuItem;
