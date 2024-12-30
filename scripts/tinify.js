const fs = require('fs').promises;
const path = require('path');

const tinify = require('tinify');
tinify.key = 'NLYqtqjHVX49MrL7K9rpzscdMgRYwHKT';

const imageExtensions = ['.jpg', '.jpeg', '.png'];
const rootDir = path.join(__dirname, '..', 'src/img');

// 递归函数，用于查找目录下的所有图片文件
async function findImagesInDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 如果是目录，递归调用
      const subImages = await findImagesInDirectory(fullPath);
      images.push(...subImages);
    } else if (
      imageExtensions.includes(path.extname(entry.name).toLowerCase())
    ) {
      // 如果是图片文件，添加到结果列表中
      images.push(fullPath);
    }
  }

  return images;
}

// 调用函数并处理结果
(async () => {
  try {
    const images = await findImagesInDirectory(rootDir);
    console.log('Found images:', images);

    if(Array.isArray(images) && images.length) {
        images.forEach(async (imagePath) => {
            const source = tinify.fromFile(imagePath);
            source.toFile(`${path.dirname(imagePath)}/${path.basename(imagePath)}`);
        });
    }
  } catch (err) {
    console.error('Error finding images:', err);
  }
})();
