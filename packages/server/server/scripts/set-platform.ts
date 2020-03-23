import { lineInFile } from 'server/scripts/utils';

const platform = `${process.argv[2] || 'LOCAL'}`;
console.log(`Set BUILD_PLATFORM=${platform}`);
lineInFile({
  file: '.env',
  line: `BUILD_PLATFORM=${platform}`,
  regex: /^BUILD_PLATFORM=/,
});
