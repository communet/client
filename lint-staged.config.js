export default {
  'src/**/*.{ts,tsx}': (stagedFiles) => {
    const stagedFilesString = stagedFiles.join(' ');

    return [
      `npm run check:format ${stagedFilesString}`,
      `npm run check:lint ${stagedFilesString}`,
      'npm run check:types',
    ];
  }
}