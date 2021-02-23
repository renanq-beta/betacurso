import React, {
  ReactElement,
  useMemo,
  useState,
} from 'react';

interface IDocumentPage {
  title: string;
  children: ReactElement;
}

const DocumentPage: React.FC<IDocumentPage> = ({ children, title }: IDocumentPage) => {
  const [, setDocumentTitle] = useState<string | null>();
  useMemo(() => {
    if (title) {
      document.title = title;
      setDocumentTitle(title);
    }
    return () => {
      setDocumentTitle(null);
    };
  }, [title]);
  return (
    <>
      {children}
    </>
  );
};

export default DocumentPage;
