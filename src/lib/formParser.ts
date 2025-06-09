// lib/formParser.ts
import { IncomingMessage } from "http";
import formidable, { File } from "formidable";

export const parseForm = (
  req: IncomingMessage
): Promise<{ fields: any; files: { [key: string]: File[] } }> => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
