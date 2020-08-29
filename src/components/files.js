
import { Plugins, FilesystemDirectory } from '@capacitor/core';
const { Filesystem } = Plugins;

const files = {
  filesystem: Filesystem,
  dataDirectory: FilesystemDirectory.Data
}

export default files;