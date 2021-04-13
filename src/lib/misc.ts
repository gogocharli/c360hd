import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const {
  i18n: { defaultLocale },
} = require('../../next-i18next.config');
const miscDirectory = path.join(process.cwd(), 'src/misc');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getAllPostIds(locales: string[]) {
  let paths: { params: { id: string }; locale: string }[] = [];

  const postIds = fs.readdirSync(miscDirectory);

  for (let id of postIds) {
    for (let locale of locales) {
      let fullpath = path.join(
        miscDirectory,
        id,
        locale === defaultLocale ? 'index.md' : `index.${locale}.md`,
      );
      if (!fs.existsSync(fullpath)) {
        continue;
      }

      paths.push({ params: { id }, locale });
    }
  }

  return paths;
}

export async function getPostData(id: string, locale: string) {
  // Get the right pathname depending on the current locale

  const fileName = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;
  const fullPath = path.join(miscDirectory, id, fileName);

  if (!fs.existsSync(fullPath)) return;

  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
